import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserLogin } from 'src/app/contracts/user/login';
import { SweetStatus } from 'src/app/internal/sweet-alert/sweet-alert.status';
import { SweetalertService } from 'src/app/services/admin/sweetalert.service';
import { UserService } from 'src/app/services/common/models/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @ViewChild('loginForm', { static: true }) loginForm: NgForm;
  hide: boolean = true;
  login: UserLogin = { userNameOrEmail: '', password: '' };

  constructor(private userService: UserService, private sweetAlertService: SweetalertService, private router: Router){}

  onSubmit(){
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
        this.router.navigate(['/admin']);
      }
    });
  }

  toPassword() {
    this.hide = !this.hide;
  }

}
