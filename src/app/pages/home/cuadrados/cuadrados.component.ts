import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-cuadrados',
  templateUrl: './cuadrados.component.html',
  styleUrls: ['./cuadrados.component.scss'],
})
export class CuadradosComponent implements OnInit {
  @ViewChild('container', { static: true }) container: ElementRef | undefined;
  currentSquare: HTMLElement | null = null;
  score: number = 0;
  timer: any;
  gameTimer: any;
  remainingTime: number = 60;
  gameEnded: boolean = false;
  gameActive: boolean = true;
  base: string = 'cuadrados';
  panelOpenState = false;
  constructor(private firestore: FirestoreService) {}
  ngOnInit(): void {
    debugger;
    this.startGame();
  }
  startGame() {
    this.gameTimer = setInterval(() => {
      this.remainingTime--;
      if (this.remainingTime <= 0) {
        this.endGame();
      }
    }, 1000); // Cada segundo

    this.generateRandomSquare();
  }

  endGame() {
    clearInterval(this.gameTimer);
    clearTimeout(this.timer);
    this.gameEnded = true;
    this.gameActive = false;
    console.log('Juego terminado. Puntaje final:', this.score);
    const data = { nombre: this.firestore.getUser(), puntaje: this.score };
    this.firestore.setData(data, 'cuadrados');
    this.clearRemainingSquares();
  }

  restartGame() {
    this.gameEnded = false;
    this.gameActive = true;
    this.score = 0;
    this.remainingTime = 60;
    this.startGame();
  }

  generateRandomSquare() {
    const size = Math.floor(Math.random() * 90) + 10;
    const x = Math.floor(Math.random() * (window.innerWidth - size));
    const y = Math.floor(Math.random() * (window.innerHeight - size));

    const square = document.createElement('div');
    square.style.width = size + 'px';
    square.style.height = size + 'px';
    square.style.backgroundColor = this.getRandomColor();
    square.style.position = 'absolute';
    square.style.top = y + 'px';
    square.style.left = x + 'px';
    debugger;
    square.addEventListener('click', () => {
      if (this.currentSquare) {
        this.container?.nativeElement.removeChild(this.currentSquare);
        this.score++;
        clearTimeout(this.timer);
        this.updateScore();
        this.generateRandomSquare();
      }
    });

    if (this.container && this.gameActive) {
      this.container.nativeElement.appendChild(square);
      this.currentSquare = square;
      this.timer = setTimeout(() => {
        if (this.currentSquare === square && this.gameActive) {
          this.container?.nativeElement.removeChild(square);
          if (!this.gameEnded) {
            this.resetScore();
          }
          this.generateRandomSquare();
        }
      }, 3000);
    }
  }

  updateScore() {
    if (this.gameActive) {
      console.log('Score:', this.score);
    }
  }

  resetScore() {
    this.score = 0;
    console.log('Score reset to 0.');
  }

  getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  clearRemainingSquares() {
    if (this.container) {
      while (this.container.nativeElement.firstChild) {
        this.container.nativeElement.removeChild(
          this.container.nativeElement.firstChild
        );
      }
    }
  }
}
