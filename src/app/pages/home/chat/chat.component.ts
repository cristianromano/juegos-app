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
  orderBy,
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
    const q = query(collection(this.db, 'chats'), orderBy('fecha', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
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
