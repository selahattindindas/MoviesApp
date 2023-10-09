import { Injectable } from '@angular/core';
import { List_Platform } from 'src/app/contracts/platform/list-platform';
import { PlatformDescription, PlatformEnum } from 'src/app/enums/platform-enum';
import { HttpClientService } from '../http-client.service';
import { Observable, firstValueFrom } from 'rxjs';
import { Create_Platform } from 'src/app/contracts/platform/create-platform';
import { SweetalertService, icon } from '../../admin/sweetalert.service';
import { CancelButtonText, ConfirmButtonText, MessageText, MessageTitle } from 'src/app/internal/message-title';
import { Update_Platform } from 'src/app/contracts/platform/update-platform';
import { Router } from '@angular/router';
import { JsonResponse } from 'src/app/contracts/response/response';

@Injectable({
  providedIn: 'root'
})
export class PlatformService {

  constructor(private httpClientService: HttpClientService, private sweetalertService: SweetalertService, private router: Router) { }

  async getPlatformEnumValues(select?: string): Promise<{ value: PlatformEnum; description: string; }[]> {

    const enumValues = Object.keys(PlatformEnum)

      .filter((key) => typeof PlatformEnum[key as keyof typeof PlatformEnum] === 'number')
      .map((key) =>
      ({
        value: PlatformEnum[key as keyof typeof PlatformEnum],
        description: PlatformDescription[PlatformEnum[key as keyof typeof PlatformEnum]],
      }));

    return select === PlatformEnum.Seciniz.toString()
      ? enumValues.filter((item) => item.value !== PlatformEnum.Seciniz)
      : enumValues;
  }

  async getAllPlatform(): Promise<List_Platform[] | string> {
    const observable: Observable<JsonResponse<List_Platform[]>> = this.httpClientService.get(
      { controller: 'Platform', action: 'GetAllPlatforms' });

    const response = await firstValueFrom(observable);

    return response.statusCode === 200
      ? response.result
      : response.statusMessage;
  }

  async getPlatformById(id: string): Promise<List_Platform | string> {
    const observable: Observable<JsonResponse<List_Platform>> = this.httpClientService.get(
      { controller: 'Platform', action: 'GetByPlatformId' }, id);

    const response = await firstValueFrom(observable);

    return response.statusCode === 200
      ? response.result
      : response.statusMessage;
  }

  async createPlatform(platform: Create_Platform, name: string) {
    const observable: Observable<Create_Platform> = this.httpClientService.post(
      { controller: 'Platform', action: 'CreatePlatform', queryString: `platformName=${name}` }, platform);

    const data = await firstValueFrom(observable);

    this.sweetalertService.showAlert(
      MessageTitle.Success, MessageText.PlatformCreate, icon.Success, false, ConfirmButtonText.Okey, 3);

    this.router.navigate(['/Admin', 'Class-List']);

    return data;
  }

  async updatePlatform(platform: Update_Platform) {
    const observable: Observable<Update_Platform> = this.httpClientService.put<Update_Platform>(
      { controller: 'Platform', action: 'UpdatePlatform' }, platform);

    const data = await firstValueFrom(observable);

    this.sweetalertService.showAlert(
      MessageTitle.Success, MessageText.PlatformUpdate, icon.Success, false, ConfirmButtonText.Okey, 3);

    this.router.navigate(['/Admin', 'Class-List']);

    return data;
  }

  async deletePlatform(id: string) {
    const sweetalert = await this.sweetalertService.showAlert(
      MessageTitle.DeletedQuestion, MessageText.NoTurningBack, icon.Warning, true, ConfirmButtonText.Okey, undefined, CancelButtonText.Cancel);
    if (sweetalert.isConfirmed) {
      await firstValueFrom(this.httpClientService.delete(
        { controller: 'Platform', action: 'DeletePlatform' }, id));
      this.sweetalertService.showAlert(MessageTitle.Success,
        MessageText.PlatformDelete, icon.Success, false, ConfirmButtonText.Okey, 3)
    }
  }

}

