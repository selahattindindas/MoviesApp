import { Component } from '@angular/core';

@Component({
  selector: 'ui-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  isMenuOpen : boolean = true ;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}

