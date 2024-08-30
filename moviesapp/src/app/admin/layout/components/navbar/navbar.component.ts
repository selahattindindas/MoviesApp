import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/common/auth.service';

@Component({
  selector: 'admin-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  loggedInUsername:string = '';

  constructor(private authService: AuthService, private router: Router){}

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      let decodedToken = this.authService.decodeToken();
      this.loggedInUsername = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
    }
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/admin/login']);
  }
}
