import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
isForm: boolean = false;
hide : boolean = true;

toPassword() {
  this.hide = !this.hide;
}
toForm(){
  this.isForm = !this.isForm;
  console.log('isForm value:', this.isForm);
}
}
