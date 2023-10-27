import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EncuestaComponent } from './encuesta.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { CambiosGuard } from 'src/app/guards/cambios.guard';

const routes: Routes = [
  {
    path: '',
    component: EncuestaComponent,
    canActivate: [AuthGuard],
    canDeactivate: [CambiosGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EncuestaRoutingModule {}
