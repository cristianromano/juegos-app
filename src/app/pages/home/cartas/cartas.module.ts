import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartasRoutingModule } from './cartas-routing.module';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RankComponent } from '../rank/rank.component';
import { RankModule } from '../rank/rank.module';
import { CartasComponent } from './cartas.component';

@NgModule({
  declarations: [CartasComponent],
  imports: [
    CommonModule,
    CartasRoutingModule,
    RankModule,
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
export class CartasModule {}
