import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>
    <div class="spinner">
    <ngx-spinner size="large"></ngx-spinner>
  </div>`,
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {}
}
