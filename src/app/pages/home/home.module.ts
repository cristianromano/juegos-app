import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { AhorcadoComponent } from './ahorcado/ahorcado.component';
import { AhorcadoTecladoComponent } from './ahorcado-teclado/ahorcado-teclado.component';
import { AhorcadoPreguntasComponent } from './ahorcado-preguntas/ahorcado-preguntas.component';
import { AhorcadoDisplayComponent } from './ahorcado-display/ahorcado-display.component';

@NgModule({
  declarations: [AhorcadoComponent, HomeComponent, AhorcadoTecladoComponent, AhorcadoPreguntasComponent, AhorcadoDisplayComponent],
  imports: [CommonModule, HomeRoutingModule],
})
export class HomeModule {}
