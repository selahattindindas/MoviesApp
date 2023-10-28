import { Injectable } from '@angular/core';
import { List_Platform } from 'src/app/contracts/platform/list-platform';
import { PlatformDescription, PlatformEnum } from 'src/app/enums/platform-enum';
import { HttpClientService } from '../http-client.service';
import { Observable, firstValueFrom } from 'rxjs';
import { SweetalertService } from '../../admin/sweetalert.service';
import { CancelButtonText, ConfirmButtonText, MessageText, MessageTitle } from 'src/app/internal/message-title';
import { Router } from '@angular/router';
import { JsonResponse } from 'src/app/contracts/response/response';
import { MessageType, Position } from 'src/app/enums/sweetalert-enum';

@Injectable({
  providedIn: 'root'
})

export class PlatformService {

  constructor(private httpClientService: HttpClientService, private sweetAlertService: SweetalertService, private router: Router) { }

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
    try {
      const observable: Observable<JsonResponse<List_Platform[]>> = this.httpClientService.get({
        controller: 'Platform',
        action: 'GetAllPlatforms'
      });

      const response = await firstValueFrom(observable);

      return response.statusCode === 200
        ? response.result
        : response.statusMessage;
    } catch (error) {
      return error.message;
    }
  }

  async getPlatformById(id: number){
      const observable: Observable<JsonResponse<List_Platform>> = this.httpClientService.get({
        controller: 'Platform',
        action: 'GetByPlatformId'
      }, id);

      const response = await firstValueFrom(observable);

      return response.statusCode === 200
        ? response.result
        : response.statusMessage;
    }

  async createPlatform(name: string): Promise<string> {
      const observable: Observable<JsonResponse<string>> = this.httpClientService.post({
        controller: 'Platform',
        action: `CreatePlatform?platformName=${name}`
      }, null);

      const response = await firstValueFrom(observable);

      if (response.statusCode === 200) {
        this.sweetAlertService.showAlert({
          position: Position.TopRight,
          messageTitle: MessageTitle.Success,
          messageText: MessageText.PlatformCreate,
          icon: MessageType.Success,
          timerProgressBar: true,
          toast: true,
          delay: 1,
        });
        return response.result;
      }
      else {
        return response.statusMessage;
      }
  }
// Burayı unutma dönüceksin tekrardan
  async updatePlatform(body: unknown) {
      const observable: Observable<unknown> = this.httpClientService.put({
        controller: 'Platform',
        action: 'UpdatePlatform'
      }, body);

      await firstValueFrom(observable);

      this.sweetAlertService.showAlert({
        position: Position.TopRight,
        messageTitle: MessageTitle.Success,
        messageText: MessageText.PlatformUpdate,
        icon: MessageType.Success,
        timerProgressBar: true,
        toast: true,
        delay: 1,
      });

      this.router.navigate(['/Admin', 'Class-List']);
  }

  async deletePlatform(id: number) {
      const sweetalert = await this.sweetAlertService.showAlert({
        position: Position.Center,
        messageTitle: MessageTitle.DeletedQuestion,
        messageText: MessageText.NoTurningBack,
        icon: MessageType.Warning,
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: ConfirmButtonText.Okey,
        cancelButtonText: CancelButtonText.Cancel,
      });

      if (sweetalert.isConfirmed) {
        await firstValueFrom(this.httpClientService.delete(
          {
            controller: 'Platform',
            action: 'DeletePlatform'
          }, id));

          this.sweetAlertService.showAlert({
            position: Position.TopRight,
            messageTitle: MessageTitle.Success,
            messageText: MessageText.PlatformDelete,
            icon: MessageType.Success,
            timerProgressBar: true,
            toast: true,
            delay: 1,
          });
      }
  }
}


