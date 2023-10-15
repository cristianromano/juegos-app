import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  getFirestore,
  doc,
  setDoc,
  addDoc,
  collection,
  onSnapshot,
  getDoc,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import { MatAccordion } from '@angular/material/expansion';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  messageForm!: FormGroup;
  @ViewChild('messageContainer') private messageContainer:
    | ElementRef
    | undefined;
  app = initializeApp(environment.firebase);
  db = getFirestore(this.app);
  panelOpenState = false;
  isReadOnly = true;
  chats: any[] = [];
  chatText?: string;

  ngOnInit(): void {
    this.traerData();
    this.scrollToBottom();
  }

  constructor(private auth: Auth, private formBuilder: FormBuilder) {
    this.messageForm = this.formBuilder.group({
      message: ['', Validators.required],
    });
  }

  onKeyPress(event: any) {
    if (event.keyCode === 13 && !event.shiftKey) {
      this.enviarMensaje();
    }
  }

  async enviarMensaje() {
    if (this.messageForm?.valid) {
      const message = this.messageForm.get('message')?.value;

      const docData = {
        fecha: new Date(),
        mensaje: message.trim(),
        nombre: this.auth.currentUser?.email,
      };

      await addDoc(collection(this.db, 'chats'), docData);
      this.messageForm.setValue({ message: '' });
    }
  }

  async traerData() {
    // const querySnapshot = await getDocs(collection(this.db, 'chats'));
    // querySnapshot.forEach((element) => {
    //   const data = element.data();
    //   this.chats.push(element.data());
    //   this.chatText += `${data['nombre']}: ${data['mensaje']}\n`;
    // });

    const unsubscribe = onSnapshot(collection(this.db, 'chats'), (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        const data = change.doc.data();
        this.chats.push(data);
        this.chatText += `${data['nombre']}: ${data['mensaje']}\n`;
      });
    });
  }

  scrollToBottom(): void {
    if (this.messageContainer) {
      this.messageContainer.nativeElement.scrollTop =
        this.messageContainer.nativeElement.scrollHeight;
    }
  }
}
