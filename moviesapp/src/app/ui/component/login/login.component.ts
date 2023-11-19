import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';
import { SpinnerType } from 'src/app/enums/spinner-enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends BaseComponent implements OnInit {
isForm: boolean = false;
hide : boolean = true;

constructor(spinner:NgxSpinnerService){
  super(spinner);
}

ngOnInit(): void {
    this.componentSpinner(SpinnerType.JellyBox);
}

toPassword() {
  this.hide = !this.hide;
}

toForm(){
  this.isForm = !this.isForm;
  console.log('isForm value:', this.isForm);
}
}
