import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';
import { SpinnerType } from 'src/app/enums/spinner-enum';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent extends BaseComponent implements OnInit{
  constructor(spinner:NgxSpinnerService){
    super(spinner);
  }
  ngOnInit(): void {
      this.componentSpinner(SpinnerType.JellyBox);
  }
}
