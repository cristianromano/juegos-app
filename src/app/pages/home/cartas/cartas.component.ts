import { Component, OnInit } from '@angular/core';
import { CartasService } from 'src/app/services/cartas.service';

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
  constructor(private cartas: CartasService) {}

  ngOnInit(): void {
    this.cartas.getCard().subscribe((data) => {
      this.currentCard = data.cards[0];
      console.log(this.currentCard);
    });
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
    if (this.cartaAnterior !== null) {
      this.comparador = cartaAnterior > currentCard;

      if (!this.comparador && this.mayor) {
        this.mensaje = 'la carta anterior es menor';
      }

      if (this.comparador && this.menor) {
        this.mensaje = 'la carta anterior es mayor';
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
