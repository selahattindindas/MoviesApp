import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserLogin } from 'src/app/contracts/user/login';
import { UserRegister } from 'src/app/contracts/user/register';
import { SweetStatus } from 'src/app/internal/sweet-alert/sweet-alert.status';
import { SweetalertService } from 'src/app/services/admin/sweetalert.service';
import { UserService } from 'src/app/services/common/models/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('loginForm', { static: true }) loginForm: NgForm;
  @ViewChild('registerForm', { static: true }) registerForm: NgForm;
  isForm: boolean = false;
  hide: boolean = true;
  register: UserRegister = { email: '', userName: '', password: '', phoneNumber: '' };
  login: UserLogin = { userNameOrEmail: '', password: '' };

  constructor(
    private userService: UserService,
    private sweetAlertService: SweetalertService,
    private router: Router) { }

  ngOnInit(): void {

  }

  toPassword() {
    this.hide = !this.hide;
  }

  toForm() {
    this.isForm = !this.isForm;
  }

  onRegister() {
    if (!this.registerForm.valid)
      return;

    const formData = this.registerForm.value;
    const register: UserRegister = {

      email: formData.email,
      userName: formData.userName,
      password: formData.password,
      phoneNumber: formData.phoneNumber
    };
    this.userService.userRegister(register, async () => {
      const result = await this.sweetAlertService.showAlert(SweetStatus.sweetSuccess);
      if (result.dismiss) {
        this.router.navigate(['/']);
      }
    }, error => {
    });

  }

  onLogin() {
    if (!this.loginForm.valid)
      return;

    const formData = this.loginForm.value;
    const login: UserLogin = {
      userNameOrEmail: formData.userNameOrEmail,
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
