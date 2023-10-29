import { Injectable } from '@angular/core';
import { List_Platform } from 'src/app/contracts/platform/list-platform';
import { PlatformDescription, PlatformEnum } from 'src/app/enums/platform-enum';
import { HttpClientService } from '../http-client.service';
import { Observable, firstValueFrom } from 'rxjs';
import { JsonResponse } from 'src/app/contracts/response/response';
import { Update_Platform } from 'src/app/contracts/platform/update-platform';

@Injectable({
  providedIn: 'root'
})

export class PlatformService {

  constructor(private httpClientService: HttpClientService) { }
//YAPILDI
  async getPlatformEnumValues(select?: boolean): Promise<{ value: PlatformEnum; description: string; }[]> {
    const enumValues = Object.keys(PlatformEnum)
      .filter((key) => typeof PlatformEnum[key as keyof typeof PlatformEnum] === 'number')
      .map((key) => ({
        value: PlatformEnum[key as keyof typeof PlatformEnum],
        description: PlatformDescription[PlatformEnum[key as keyof typeof PlatformEnum]],
      }));

    return select === false
      ? enumValues.filter((item) => item.value !== PlatformEnum.Seciniz)
      : enumValues;
  }

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

  async createPlatform(name: string, successCallBack?: () => void) {
    const observable = this.httpClientService.post({
      controller: 'Platform',
      action: `CreatePlatform?platformName=${name}`
    }, name);

    const response = await firstValueFrom(observable);

    successCallBack();
    
    return response;
  }
 
  async updatePlatform(platform: Update_Platform, successCallBack?: () => void) {
    const observable: Observable<Update_Platform> = this.httpClientService.put({
      controller: 'Platform',
      action: 'UpdatePlatform'
    }, platform);

    const response = await firstValueFrom(observable);

    successCallBack();

    return response;
  }

  async deletePlatform(id: number, successCallBack?: () => void) {
    const observable: Observable<JsonResponse<List_Platform>> = this.httpClientService.delete(
      {
        controller: 'Platform',
        action: 'DeletePlatform'
      }, id);

    const response = await firstValueFrom(observable);

    successCallBack();
    
    return response.statusCode === 200
      ? response.result
      : response.statusMessage;
  }
}


