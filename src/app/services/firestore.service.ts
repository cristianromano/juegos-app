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

  // async getData(base: string) {
  //   debugger;
  //   return new Promise<any[]>((resolve, reject) => {
  //     const data: any[] = [];
  //     const q = query(
  //       collection(this.db, base),
  //       orderBy('puntaje', 'desc'),
  //       limit(5)
  //     );
  //     const unsubscribe = onSnapshot(q, (querySnapshot) => {
  //       data.length = 0;
  //       querySnapshot.forEach((doc) => {
  //         data.push(doc.data());
  //       });
  //       resolve(data);
  //     });
  //   });
  // }

  getData(base: string, callback: (data: any[]) => void) {
    const data: any[] = [];
    const q = query(
      collection(this.db, base),
      orderBy('puntaje', 'desc'),
      limit(5)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      data.length = 0;
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      callback(data);
    });

    return unsubscribe;
  }

  getUser() {
    return this.auth.currentUser?.email;
  }
}
