import { Component, Input } from '@angular/core';
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
  constructor(private hangMan: HangmanService) {}

  ngOnInit() {
    this.hangMan.getQuestion().subscribe((e) => {
      this.category = e.category;
      this.questions = e.items;
      this.pickNewQuestion();
    });
  }

  guess(letter: string) {
    if (!letter || this.guesses.includes(letter)) {
      return;
    }
    this.guesses = [...this.guesses, letter];
  }

  reset() {
    this.guesses = [];
    this.pickNewQuestion();
    this.restartGameBtn = false;
  }

  pickNewQuestion() {
    const index = Math.floor(Math.random() * this.questions.length);
    this.question = this.questions[index];
    console.log(this.question);
  }

  gameFinish() {
    this.restartGameBtn = true;
  }
}
