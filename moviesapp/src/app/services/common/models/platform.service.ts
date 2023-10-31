import { Injectable } from '@angular/core';
import { List_Platform } from 'src/app/contracts/platform/list-platform';
import { HttpClientService } from '../http-client.service';
import { Observable, firstValueFrom } from 'rxjs';
import { JsonResponse } from 'src/app/contracts/response/response';
import { Update_Platform } from 'src/app/contracts/platform/update-platform';

@Injectable({
  providedIn: 'root'
})

export class PlatformService {

  constructor(private httpClientService: HttpClientService) { }

  async getAllPlatform() {

    const observable: Observable<JsonResponse<List_Platform[]>> = this.httpClientService.get({
      controller: 'Platform',
      action: 'GetAllPlatforms'
    });

    const response = await firstValueFrom(observable);

    return response.statusCode === 200
      ? response.result
      : response.statusMessage;
  }

  async getPlatformById(id: number) {
    const observable: Observable<JsonResponse<List_Platform>> = this.httpClientService.get({
      controller: 'Platform',
      action: 'GetByPlatformId'
    }, id);

    const response = await firstValueFrom(observable);

    return response.statusCode === 200
      ? response.result
      : response.statusMessage;
  }

  async createPlatform(name: string, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void) {
    const observable = this.httpClientService.post({
      controller: 'Platform',
      action: `CreatePlatform?platformName=${name}`
    }, name);

    await firstValueFrom(observable)
      .then(response => {
        successCallBack();
        return response;
      })
      .catch(errorResponse => {
        errorCallBack(errorResponse);
      });
  }

  async updatePlatform(platform: Update_Platform, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void) {
    const observable: Observable<Update_Platform> = this.httpClientService.put({
      controller: 'Platform',
      action: 'UpdatePlatform'
    }, platform);

    await firstValueFrom(observable)
      .then(response => {
        successCallBack();
        return response;
      })
      .catch(errorResponse => {
        errorCallBack(errorResponse);
      });
  }

  async deletePlatform(id: number, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void) {
    const observable: Observable<JsonResponse<List_Platform>> = this.httpClientService.delete(
      {
        controller: 'Platform',
        action: 'DeletePlatform'
      }, id);

    await firstValueFrom(observable)
      .then(response => {
        successCallBack();
        return response.statusCode === 200 && response.result;
      }).catch(errorResponse => {
        errorCallBack(errorResponse);
      });
  }
}


