import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(private route: Router) {}

  irAhorcado() {
    this.route.navigate(['home/ahorcado']);
  }

  irCartas() {
    this.route.navigate(['home/cartas']);
  }

  irPreguntas() {
    this.route.navigate(['home/preguntas']);
  }
}
