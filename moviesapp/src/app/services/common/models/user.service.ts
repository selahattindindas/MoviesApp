import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { UserRegister } from 'src/app/contracts/user/register';
import { Observable, firstValueFrom } from 'rxjs';
import { UserLogin } from 'src/app/contracts/user/login';
import { JsonResponse } from 'src/app/contracts/response/response';
import { Token } from 'src/app/contracts/token/token';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClientService: HttpClientService) { }
  async userRegister(register: UserRegister, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void) {
    const observable: Observable<UserRegister> = this.httpClientService.post({
      controller: 'v1/Auth',
      action: 'Create'
    }, register);

    await firstValueFrom(observable)
      .then(response => {
        successCallBack();
        return response;
      })
      .catch(errorResponse => {
        errorCallBack(errorResponse.error.message);
      });
  }

  async userLogin(login: UserLogin, successCallBack?: () => void) {
    const observable: Observable< any | Token> = this.httpClientService.post({
      controller: 'v1/Auth',
      action: 'Login'
    }, login);

   const tokenResponse = await firstValueFrom(observable)
      if (tokenResponse.result.accessToken) {
        localStorage.setItem("accessToken", tokenResponse.result.accessToken);
        localStorage.setItem("refreshToken", tokenResponse.result.refreshToken);
        successCallBack();
      }
    }
  }

