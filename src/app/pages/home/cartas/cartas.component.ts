import { Component, Input, OnInit } from '@angular/core';
import { CartasService } from 'src/app/services/cartas.service';
import { FirestoreService } from 'src/app/services/firestore.service';

interface CartaRank {
  nombre: string;
  puntaje: string;
}
@Component({
  selector: 'app-cartas',
  templateUrl: './cartas.component.html',
  styleUrls: ['./cartas.component.scss'],
})
export class CartasComponent implements OnInit {
  currentCard: any;
  cartaAnterior: any;
  comparador: any;
  mayor: any;
  menor: any;
  backCard: string = './assets/back.png';
  mensaje: any;
  score: number = 0;
  tiempo: any = 0;
  tiempoDisponible: any = 10;
  gameEnded?: boolean;
  gameActive?: boolean = true;
  base: string = 'cartas';
  constructor(
    private cartas: CartasService,
    private firestore: FirestoreService
  ) {}

  startGame() {
    this.tiempo = setInterval(() => {
      this.tiempoDisponible--;
      if (this.tiempoDisponible <= 0) {
        this.endGame();
      }
    }, 1000); // Cada segundo
  }

  endGame() {
    clearInterval(this.tiempo);
    clearTimeout(this.tiempoDisponible);
    this.gameEnded = true;
    this.gameActive = false;
    console.log('Juego terminado. Puntaje final:', this.score);
    const data = { nombre: this.firestore.getUser(), puntaje: this.score };
    this.firestore.setData(data, 'cartas');
  }

  restartGame() {
    this.gameEnded = false;
    this.gameActive = true;
    this.score = 0;
    this.tiempoDisponible = 60;
    this.startGame();
  }

  ngOnInit(): void {
    this.cartas.getCard().subscribe((data) => {
      this.currentCard = data.cards[0];
      console.log(this.currentCard);
    });
    this.startGame();
  }

  cartaNueva() {
    this.cartaAnterior = this.currentCard.value;
    this.cartas.getCard().subscribe((data) => {
      this.currentCard = data.cards[0];
      this.comparadorCarta();
    });
  }

  comparadorCarta() {
    const currentCard = this.getCardValue(this.currentCard.value);
    const cartaAnterior = this.getCardValue(this.cartaAnterior);
    if (this.cartaAnterior !== null && this.gameActive == true) {
      this.score++;
      this.comparador = cartaAnterior > currentCard;

      if (!this.comparador && this.mayor) {
        this.mensaje = 'la carta anterior es menor';
        this.score = 0;
      }

      if (this.comparador && this.menor) {
        this.mensaje = 'la carta anterior es mayor';
        this.score = 0;
      }
      this.mayor = false;
      this.menor = false;
    }
  }

  esMayor() {
    this.mensaje = null;
    this.mayor = true;
    this.cartaNueva();
  }

  esMenor() {
    this.mensaje = null;
    this.menor = true;
    this.cartaNueva();
  }

  getCardValue(cardValue: string) {
    switch (cardValue) {
      case 'ACE':
        return 1;
      case 'KING':
        return 13;
      case 'QUEEN':
        return 12;
      case 'JACK':
        return 11;
      default:
        return parseInt(cardValue);
    }
  }
}
