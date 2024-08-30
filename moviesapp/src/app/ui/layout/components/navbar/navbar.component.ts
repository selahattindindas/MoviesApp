import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/common/auth.service';

@Component({
  selector: 'ui-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  
  constructor(public authService: AuthService, private router:Router) { }

  logout() {
    this.authService.logout();
    this.router.navigate(['/filmler/giris']);
  }
}
