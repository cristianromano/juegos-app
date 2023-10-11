import { Component } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent {
  email: string = '';
  password: string = '';
  constructor(
    private route: Router,
    private auth: Auth,
    private toastr: ToastrService
  ) {}

  registrarse() {
    createUserWithEmailAndPassword(this.auth, this.email, this.password)
      .then((usuario) => {
        console.log(usuario.user);
        this.toastr.success('Registro Correcto');
        this.route.navigate(['/home']);
      })
      .catch((error) => {
        this.toastr.error(error.code);
      });
  }

  irLogin() {
    this.route.navigate(['/login']);
  }
}
