import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
  DocumentData,
  addDoc,
  collection,
  getDocs,
  getFirestore,
  query,
  orderBy,
  limit,
  onSnapshot,
} from 'firebase/firestore';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  app = initializeApp(environment.firebase);
  db = getFirestore(this.app);
  auth = getAuth(this.app);

  constructor() {}

  async setData(data: any, base: string) {
    addDoc(collection(this.db, base), data).then((e) => {
      console.log('ok');
    });
  }

  async getData(base: string) {
    return new Promise<any[]>((resolve, reject) => {
      const data: any[] = [];
      const q = query(
        collection(this.db, base),
        orderBy('puntaje', 'desc'),
        limit(5)
      );
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        data.length = 0;
        querySnapshot.docChanges().forEach((doc) => {
          data.push(doc.doc.data());
        });
        resolve(data);
      });
    });
  }

  getUser() {
    return this.auth.currentUser?.email;
  }
}
