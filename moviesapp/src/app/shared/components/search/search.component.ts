import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  @Input() filterText: string = "";
  @Output() filterTextChange = new EventEmitter<string>();

  onFilterTextChange(newText: string) {
    this.filterText = newText;
    this.filterTextChange.emit(this.filterText);
  }
}
