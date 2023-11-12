import { Component } from "@angular/core";


@Component({
  selector: 'admin-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  isMenuOpen : boolean = true ;
  isMenuClose : boolean = false;
  constructor(){}

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    this.isMenuClose = !this.isMenuClose;
  }
}
