import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login.component';

const routes: Routes = [
  { path: '', component: LoginComponent },

  {
    path: 'registro',
    loadChildren: () =>
      import('./registro/registro.module').then((m) => m.RegistroModule),
  },
  {
    path: 'home',
    loadChildren: () => import('../home/home.module').then((m) => m.HomeModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {}
