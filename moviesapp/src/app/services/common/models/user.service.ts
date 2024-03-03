import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { UserRegister } from 'src/app/contracts/user/register';
import { Observable, firstValueFrom } from 'rxjs';
import { UserLogin } from 'src/app/contracts/user/login';
import { TokenResponse } from 'src/app/contracts/token/tokenResponse';

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
    const observable: Observable<UserLogin | TokenResponse> = this.httpClientService.post({
      controller: 'v1/Auth',
      action: 'Login'
    }, login);
    const tokenResponse: TokenResponse = await firstValueFrom(observable) as TokenResponse;
    if (tokenResponse) {
      localStorage.setItem("accessToken", tokenResponse.token.accessToken);
      localStorage.setItem("refreshToken", tokenResponse.token.refreshToken);
      successCallBack();
    }
  }
}
