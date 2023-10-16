import { Component, OnInit } from '@angular/core';
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

  constructor(private preguntas: PreguntasService) {}

  ngOnInit(): void {
    this.preguntas.getPreguntas().subscribe((data) => {
      data.preguntas.forEach((pregunta: any) => {
        this.preguntasArr.push({
          pregunta: pregunta.pregunta,
          imagen: pregunta.imagen,
          opciones: pregunta.opciones,
        });
      });
      console.log(this.preguntasArr[0].opciones[1]);
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
        debugger;
        this.siguientePregunta();
        this.mostrarRespuestaCorrecta = false;
      }, 1000);
    } else {
      this.mostrarRespuestaCorrecta = false;
      this.mostrarRespuestaIncorrecta = true;
      setTimeout(() => {
        this.mostrarRespuestaIncorrecta = false;
      }, 2000);
    }
  }
}
