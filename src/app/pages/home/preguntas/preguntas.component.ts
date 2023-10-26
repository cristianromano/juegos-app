import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import { PreguntasService } from 'src/app/services/preguntas.service';

@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.scss'],
})
export class PreguntasComponent implements OnInit {
  preguntasArr: any[] = [];
  preguntaActual: number = 0;
  mostrarRespuestaCorrecta: boolean = false;
  mostrarRespuestaIncorrecta: boolean = false;
  tiempo: any;
  tiempoDisponible: any = 10;
  gameEnded?: boolean;
  gameActive?: boolean = true;
  score: any = 0;
  base: string = 'preguntas';
  constructor(
    private preguntas: PreguntasService,
    private firestore: FirestoreService
  ) {}

  startGame() {
    this.tiempo = setInterval(() => {
      this.tiempoDisponible--;
      if (this.tiempoDisponible <= 0) {
        this.endGame();
      }
    }, 1000);
  }

  endGame() {
    clearInterval(this.tiempo);
    clearTimeout(this.tiempoDisponible);
    this.gameEnded = true;
    this.gameActive = false;
    const data = { nombre: this.firestore.getUser(), puntaje: this.score };
    this.firestore.setData(data, 'preguntas');
    console.log('Juego terminado. Puntaje final:', this.score);
  }

  restartGame() {
    this.gameEnded = false;
    this.gameActive = true;
    this.score = 0;
    this.tiempoDisponible = 60;
    this.startGame();
  }

  ngOnInit(): void {
    this.preguntas.getPreguntas().subscribe((data) => {
      data.preguntas.forEach((pregunta: any) => {
        this.preguntasArr.push({
          pregunta: pregunta.pregunta,
          imagen: pregunta.imagen,
          opciones: pregunta.opciones,
        });
      });
      this.startGame();
    });
  }

  siguientePregunta() {
    if (this.preguntaActual == 2) {
      this.preguntaActual = 0;
    } else {
      this.preguntaActual++;
    }
  }

  respuesta(rta: any) {
    if (rta.correcto == true) {
      this.mostrarRespuestaCorrecta = true;
      this.mostrarRespuestaIncorrecta = false;
      setTimeout(() => {
        this.score++;
        this.siguientePregunta();
        this.mostrarRespuestaCorrecta = false;
      }, 1000);
    } else {
      this.mostrarRespuestaCorrecta = false;
      this.mostrarRespuestaIncorrecta = true;
      setTimeout(() => {
        this.score = 0;
        this.mostrarRespuestaIncorrecta = false;
      }, 2000);
    }
  }
}
