import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AhorcadoRoutingModule } from './ahorcado-routing.module';
import { AhorcadoComponent } from './ahorcado.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RankModule } from '../rank/rank.module';
import { AhorcadoTecladoComponent } from './ahorcado-teclado/ahorcado-teclado.component';
import { AhorcadoPreguntasComponent } from './ahorcado-preguntas/ahorcado-preguntas.component';
import { AhorcadoDisplayComponent } from './ahorcado-display/ahorcado-display.component';

@NgModule({
  declarations: [
    AhorcadoComponent,
    AhorcadoTecladoComponent,
    AhorcadoPreguntasComponent,
    AhorcadoDisplayComponent,
  ],
  imports: [
    CommonModule,
    AhorcadoRoutingModule,
    RankModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    MatRadioModule,
    MatCheckboxModule,
  ],
})
export class AhorcadoModule {}
