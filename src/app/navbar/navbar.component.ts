import { Component } from '@angular/core';
import { Router } from '@angular/router';
//import { Auth, getAuth } from '@angular/fire/auth';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';
import { getAuth } from 'firebase/auth';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  app = initializeApp(environment.firebase);
  auth = getAuth(this.app);

  userEmail: string | null = null;
  constructor(private route: Router) {}
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
