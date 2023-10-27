import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { AhorcadoComponent } from './ahorcado/ahorcado.component';
import { CartasComponent } from './cartas/cartas.component';
import { PreguntasComponent } from './preguntas/preguntas.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { CuadradosComponent } from './cuadrados/cuadrados.component';
import { EncuestaComponent } from './encuesta/encuesta.component';
import { CambiosGuard } from 'src/app/guards/cambios.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'home/ahorcado',
    loadChildren: () =>
      import('./ahorcado/ahorcado.module').then((m) => m.AhorcadoModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'home/cartas',
    loadChildren: () =>
      import('./cartas/cartas.module').then((m) => m.CartasModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'home/preguntas',
    loadChildren: () =>
      import('./preguntas/preguntas.module').then((m) => m.PreguntasModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'home/cuadrados',
    loadChildren: () =>
      import('./cuadrados/cuadrados.module').then((m) => m.CuadradosModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'home/encuesta',
    loadChildren: () =>
      import('./encuesta/encuesta.module').then((m) => m.EncuestaModule),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
