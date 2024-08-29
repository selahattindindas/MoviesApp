import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';
import { SpinnerType } from 'src/app/constacts/spinner-enum';
import { UserLogin } from 'src/app/contracts/user/login';
import { UserRegister } from 'src/app/contracts/user/register';
import { SweetStatus } from 'src/app/internal/sweet-alert/sweet-alert.status';
import { SweetalertService } from 'src/app/services/admin/sweetalert.service';
import { UserService } from 'src/app/services/common/models/user.service';
import { phoneNumberValidator } from 'src/app/shared/validators/phone.validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends BaseComponent implements OnInit {
  isForm: boolean = false;
  hide: boolean = true;
  isRegisterorLogin: FormGroup;

  constructor(spinner: NgxSpinnerService, private fb: FormBuilder, private userService: UserService, private sweetAlertService: SweetalertService,
    private router: Router) {
    super(spinner);
    this.isRegisterorLogin = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.minLength(5)]),
      userName: new FormControl('', [Validators.required, Validators.minLength(5)]),
      password: new FormControl('', [Validators.required, Validators.minLength(5)]),
      phoneNumber: new FormControl('', [Validators.required, phoneNumberValidator()]),
    });
  }

  ngOnInit(): void {
    this.componentSpinner(SpinnerType.JellyBox);
  }

  toPassword() {
    this.hide = !this.hide;
  }
  isPhoneNumberRequired() {
    return this.isRegisterorLogin.get('phoneNumber').hasError('required') && this.isRegisterorLogin.get('phoneNumber').touched && !this.isPhoneNumberInvalid();
  }

  isPhoneNumberInvalid() {
    return !this.isRegisterorLogin.get('phoneNumber').hasError('required') && this.isRegisterorLogin.get('phoneNumber').invalid && this.isRegisterorLogin.get('phoneNumber').touched;
  }
  toForm() {
    this.isForm = !this.isForm;
  }
  onRegister() {
    if (this.isRegisterorLogin.valid) {
      const formData = this.isRegisterorLogin.value;
      const register: UserRegister = {
        email: formData.email,
        userName: formData.userName,
        password: formData.password,
        phoneNumber: formData.phoneNumber,
      };
      this.userService.userRegister(register, async () => {

        const result = await this.sweetAlertService.showAlert(SweetStatus.sweetSuccess);
        if (result.dismiss) {
          this.router.navigate(['/']);
        }
      }, error => {
      });
    }
  }

  onLogin(){
    if(this.isRegisterorLogin.valid){
      const formData = this.isRegisterorLogin.value;
      const login: UserLogin = {
        userNameOrEmail: formData.email,
        password: formData.password 
      };
      this.userService.userLogin(login, async () => {
        const result = await this.sweetAlertService.showAlert(SweetStatus.sweetSuccess);
        if (result.dismiss) {
          this.router.navigate(['/']);
        }
      });
    }
  }
}
