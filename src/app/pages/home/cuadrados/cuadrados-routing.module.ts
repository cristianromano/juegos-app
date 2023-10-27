import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CuadradosComponent } from './cuadrados.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: CuadradosComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CuadradosRoutingModule {}
