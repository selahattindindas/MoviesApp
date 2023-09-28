import { Component } from '@angular/core';

@Component({
  selector: 'banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent {
  currentImageIndex: number = 0; 
  constructor(){}
  changeImage(imageIndex: number) {
    this.currentImageIndex = imageIndex;
  }
}
