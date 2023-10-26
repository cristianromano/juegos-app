import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { AhorcadoComponent } from './ahorcado/ahorcado.component';
import { CartasComponent } from './cartas/cartas.component';
import { PreguntasComponent } from './preguntas/preguntas.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { CuadradosComponent } from './cuadrados/cuadrados.component';
import { EncuestaComponent } from './encuesta/encuesta.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'home/ahorcado',
    component: AhorcadoComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'home/cartas',
    component: CartasComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'home/preguntas',
    component: PreguntasComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'home/cuadrados',
    component: CuadradosComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'home/encuesta',
    component: EncuestaComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
