import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/common/auth.service';

@Component({
  selector: 'ui-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  isMenuOpen : boolean = true ;
  
  constructor(public authService: AuthService, private router:Router) { }

  logout() {
    this.authService.logout();
    this.router.navigate(['/filmler/giris']);
  }
  
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}

