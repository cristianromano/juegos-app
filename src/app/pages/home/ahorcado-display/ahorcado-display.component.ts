import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-ahorcado-display',
  templateUrl: './ahorcado-display.component.html',
  styleUrls: ['./ahorcado-display.component.scss'],
})
export class AhorcadoDisplayComponent implements OnInit, OnChanges {
  MAX_MISTAKES = 6;
  mistakes: any;
  @Output() gameFinished = new EventEmitter<boolean>();
  @Input() guesses: string[] = [];
  @Input() question: string = '';

  success: boolean = false;
  constructor() {
    this.mistakes = this.MAX_MISTAKES;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes?.['question']?.currentValue &&
      changes?.['question'].currentValue !== changes?.['question'].previousValue
    ) {
      this.mistakes = this.MAX_MISTAKES;
      this.success = false;
    }
    const guessesCurrentValue = changes?.['guesses']?.currentValue;
    if (
      guessesCurrentValue &&
      guessesCurrentValue.length &&
      guessesCurrentValue !== changes['guesses'].previousValue
    ) {
      const char = [...guessesCurrentValue].pop();
      this.checkGuess(char);
    }
  }
  ngOnInit(): void {}

  checkGuess(letter: string) {
    let didWin = true;
    this.mistakes -= this.wasGuess(letter);
    for (let i = 0; i < this.question.length; i++) {
      if (
        !this.guesses.find(
          (guess) => guess.toLowerCase() === this.question[i].toLowerCase()
        )
      ) {
        didWin = false;
        break;
      }
    }
    this.success = didWin;
    if (this.success || this.mistakes === 0) {
      this.gameFinished.emit(this.success);
    }
  }

  wasGuess(letter: string) {
    for (let i = 0; i < this.question.length; i++) {
      if (this.question[i].toLowerCase() === letter.toLowerCase()) {
        return 0;
      }
    }
    return 1;
  }
}
