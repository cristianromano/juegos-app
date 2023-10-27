import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartasModule } from './cartas.module';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { CartasComponent } from './cartas.component';

const routes: Routes = [
  {
    path: '',
    component: CartasComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CartasRoutingModule {}
