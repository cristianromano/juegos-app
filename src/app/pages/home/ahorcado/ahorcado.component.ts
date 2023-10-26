import { Component, Input } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import { HangmanService } from 'src/app/services/hangman.service';

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.scss'],
})
export class AhorcadoComponent {
  question: string = '';
  questions: string[] = [];
  guesses: string[] = [];
  category: string = '';
  restartGameBtn = false;
  tiempo: any;
  tiempoDisponible: any = 60;
  record: any;
  base: string = 'ahorcado';
  constructor(
    private hangMan: HangmanService,
    private firestore: FirestoreService
  ) {}

  ngOnInit() {
    this.hangMan.getQuestion().subscribe((e) => {
      this.category = e.category;
      this.questions = e.items;
      this.pickNewQuestion();
      this.startGame();
    });
  }
  startGame() {
    this.tiempo = setInterval(() => {
      this.tiempoDisponible--;
      if (this.tiempoDisponible <= 0) {
        this.gameFinish();
      }
    }, 1000);
  }

  guess(letter: string) {
    if (!letter || this.guesses.includes(letter)) {
      return;
    }
    this.guesses = [...this.guesses, letter];
    if (this.question.split('').every((char) => this.guesses.includes(char))) {
      this.gameFinish();
    }
  }

  reset() {
    this.guesses = [];
    this.pickNewQuestion();
    this.restartGameBtn = false;
    this.tiempoDisponible = 60;
    clearInterval(this.tiempo);
    this.tiempo = null;
    this.startGame();
  }

  pickNewQuestion() {
    const index = Math.floor(Math.random() * this.questions.length);
    this.question = this.questions[index];
    console.log(this.question);
  }

  gameFinish() {
    this.restartGameBtn = true;
    this.record = this.tiempoDisponible;
    clearInterval(this.tiempo);
    this.tiempo = null;
    const data = {
      nombre: this.firestore.getUser(),
      puntaje: `0:${this.tiempoDisponible}`,
    };
    this.firestore.setData(data, 'ahorcado');
  }
}
