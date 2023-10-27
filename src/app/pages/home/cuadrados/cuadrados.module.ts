import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CuadradosRoutingModule } from './cuadrados-routing.module';
import { RankComponent } from '../rank/rank.component';
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
import { CuadradosComponent } from './cuadrados.component';
import { RankModule } from '../rank/rank.module';

@NgModule({
  declarations: [CuadradosComponent],
  imports: [
    CommonModule,
    CuadradosRoutingModule,
    ReactiveFormsModule,
    RankModule,
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
export class CuadradosModule {}
