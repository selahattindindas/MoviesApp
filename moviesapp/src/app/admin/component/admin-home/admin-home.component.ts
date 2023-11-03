import { Component } from '@angular/core';

@Component({
  selector: 'app-adminhome',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent  {
  isMenuOpen = false;

  constructor(){}

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}

