import { Component, EventEmitter, Input, Output } from '@angular/core';
import { List_Movie } from 'src/app/contracts/movie/list-movie';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() movies: List_Movie[] = [];
}
