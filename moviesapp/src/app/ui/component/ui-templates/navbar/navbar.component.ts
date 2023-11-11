import { Component } from '@angular/core';

@Component({
  selector: 'ui-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isMenuOpen : boolean = true ;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
