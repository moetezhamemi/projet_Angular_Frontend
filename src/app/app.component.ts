import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Correction : 'styleUrls' au lieu de 'styleUrl'
})
export class AppComponent implements OnInit {
  title = 'mesClients';

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit() {
    let isloggedin: string | null = null;
    let loggedUser: string | null = null;

    // Vérifier si localStorage est défini avant d'y accéder
    if (typeof localStorage !== 'undefined') {
      isloggedin = localStorage.getItem('isloggedIn');
      loggedUser = localStorage.getItem('loggedUser');
    }

    if (isloggedin !== "true" || !loggedUser) {
      this.router.navigate(['/login']);
    } else {
      this.authService.setLoggedUserFromLocalStorage(loggedUser);
    }
  }
  onlogout() {
    this.authService.logout();
  }
}
