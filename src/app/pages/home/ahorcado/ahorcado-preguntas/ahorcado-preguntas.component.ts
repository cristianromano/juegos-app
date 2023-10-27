import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-ahorcado-preguntas',
  templateUrl: './ahorcado-preguntas.component.html',
  styleUrls: ['./ahorcado-preguntas.component.scss'],
})
export class AhorcadoPreguntasComponent implements OnInit, OnChanges {
  @Input() guesses: string[] = [];
  @Input() question: string = '';
  characters: { value: string; guessed: boolean }[] = [];
  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    const changesCurrenValue = changes?.['question']?.currentValue;
    if (
      changesCurrenValue &&
      changesCurrenValue !== changes?.['question']?.previousValue
    ) {
      this.characters = this.question
        .split('')
        .map((e) => ({ value: e, guessed: false }));
    }

    const guessesCurrentValue = changes?.['guesses']?.currentValue;
    if (
      guessesCurrentValue &&
      guessesCurrentValue.length &&
      guessesCurrentValue !== changes['guesses'].previousValue
    ) {
      const guessedChar = [...changes['guesses'].currentValue].pop();
      this.characters = this.characters.map((char) => {
        if (char.value.toLowerCase() === guessedChar.toLowerCase()) {
          return { ...char, guessed: true };
        }
        return char;
      });
    }
  }
}
