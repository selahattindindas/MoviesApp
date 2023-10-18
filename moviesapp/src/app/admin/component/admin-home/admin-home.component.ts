import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/app/environments/environment';


@Component({
  selector: 'app-adminhome',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  constructor(){}
  ngOnInit(): void {   
  }
}
