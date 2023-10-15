import { NgModule, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { AhorcadoComponent } from './ahorcado/ahorcado.component';
import { AhorcadoTecladoComponent } from './ahorcado-teclado/ahorcado-teclado.component';
import { AhorcadoPreguntasComponent } from './ahorcado-preguntas/ahorcado-preguntas.component';
import { AhorcadoDisplayComponent } from './ahorcado-display/ahorcado-display.component';
import { CartasComponent } from './cartas/cartas.component';
import { MatButtonModule } from '@angular/material/button';
import { ChatComponent } from './chat/chat.component';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    AhorcadoComponent,
    CartasComponent,
    HomeComponent,
    AhorcadoTecladoComponent,
    AhorcadoPreguntasComponent,
    AhorcadoDisplayComponent,
    ChatComponent,
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    CommonModule,
    HomeRoutingModule,
    MatButtonModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
  ],
})
export class HomeModule {}
