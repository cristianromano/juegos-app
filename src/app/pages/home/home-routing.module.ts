import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { AhorcadoComponent } from './ahorcado/ahorcado.component';
import { CartasComponent } from './cartas/cartas.component';
import { PreguntasComponent } from './preguntas/preguntas.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'home/ahorcado',
    component: AhorcadoComponent,
  },
  {
    path: 'home/cartas',
    component: CartasComponent,
  },
  {
    path: 'home/preguntas',
    component: PreguntasComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
