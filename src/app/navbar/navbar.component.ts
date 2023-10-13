import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  userEmail: string | null = null;
  constructor(private route: Router, private auth: Auth) {}
  redirigirBio() {
    this.route.navigate(['/bio']);
  }
  logOut() {
    this.auth.signOut();
    this.route.navigate(['/']);
  }
  IrHome() {
    this.route.navigate(['/']);
  }
  ngOnInit() {
    this.estaLogueado();
  }
  estaLogueado() {
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        this.userEmail = user.email;
      } else {
        this.userEmail = null;
      }
    });
  }

  irSegunLog() {
    if (this.userEmail) {
      return '/home';
    } else {
      return '/';
    }
  }
}
