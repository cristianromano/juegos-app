import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { AhorcadoComponent } from './ahorcado/ahorcado.component';
import { AhorcadoTecladoComponent } from './ahorcado-teclado/ahorcado-teclado.component';
import { AhorcadoPreguntasComponent } from './ahorcado-preguntas/ahorcado-preguntas.component';
import { AhorcadoDisplayComponent } from './ahorcado-display/ahorcado-display.component';
import { CartasComponent } from './cartas/cartas.component';
import { MatButtonModule } from '@angular/material/button';
@NgModule({
  declarations: [
    AhorcadoComponent,
    CartasComponent,
    HomeComponent,
    AhorcadoTecladoComponent,
    AhorcadoPreguntasComponent,
    AhorcadoDisplayComponent,
  ],
  imports: [CommonModule, HomeRoutingModule, MatButtonModule],
})
export class HomeModule {}
