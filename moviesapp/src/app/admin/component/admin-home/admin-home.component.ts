import { Component, OnInit } from '@angular/core';
import { environment } from 'src/app/environments/environment';


@Component({
  selector: 'app-adminhome',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  envInfo = environment;
  constructor(){}
  ngOnInit(): void {
      
  }
}
