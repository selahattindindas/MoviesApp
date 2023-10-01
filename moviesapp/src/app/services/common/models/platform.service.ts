import { Injectable } from '@angular/core';
import { List_Platform } from 'src/app/contracts/platform/list-platform';
import { PlatformDescription, PlatformEnum } from 'src/app/enums/platform-enum';
import { HttpClientService } from '../http-client.service';
import { Observable, firstValueFrom } from 'rxjs';
import { Create_Platform } from 'src/app/contracts/platform/create-platform';
import { SweetalertService, icon } from '../../admin/sweetalert.service';
import { CancelButtonText, ConfirmButtonText, MessageText, MessageTitle } from 'src/app/internal/message-title';
import { Update_Platform } from 'src/app/contracts/platform/update-platform';

@Injectable({
  providedIn: 'root'
})
export class PlatformService {

  constructor(private httpClientService: HttpClientService, private sweetalertService: SweetalertService) { }
  getPlatformEnumValues(): PlatformEnum[] {
    const enumValues = Object.values(PlatformEnum) as PlatformEnum[];
    return enumValues.filter((value) => typeof value === 'number');
  }
  getPlatformDescriptions(): { [key in number]: string } {
    return PlatformDescription;
  }
  async post(platform: Create_Platform){
    this.httpClientService.post({
      controller:'Platform'
    },platform).subscribe(()=>{
      this.sweetalertService.showAlert(
        MessageTitle.Success,
        MessageText.PlatformCreate,
        icon.Success,
        false,
        ConfirmButtonText.Okey,
        3
      );
    })
  }
  async get():Promise<Partial<List_Platform[]>> {
    const observable :Observable<List_Platform[]> = this.httpClientService.get
    <List_Platform[]>({
      controller: 'Platform'
    });
    const data = await firstValueFrom(observable);
    return data;
  }
  async getPlatformId(id: string):Promise<Partial<List_Platform>> {
    const observable :Observable<List_Platform> = this.httpClientService.get
    <List_Platform>({
      controller: 'Platform'
    }, id);
    const data = await firstValueFrom(observable);
    return data;
  }
  async delete(id:string){
    const  sweetalert = await this.sweetalertService.showAlert(
      MessageTitle.Deleted,
      MessageText.DeleteWarning,
      icon.Warning,
      true,
      ConfirmButtonText.Okey,
      undefined,
      CancelButtonText.Cancel
    );
    if(sweetalert && sweetalert.isConfirmed){
      await firstValueFrom(
        this.httpClientService.delete<any>({controller:'Platform'},id)
      );
      this.sweetalertService.showAlert(MessageTitle.Success,
        MessageText.PlatformDelete,
        icon.Success,
        false,
        ConfirmButtonText.Okey,
        3)
    }
  }
  async put(platform:Update_Platform,id:string){
    this.httpClientService.put({
      controller:'Platform',
      action: id
    }, platform).subscribe(()=>{
      this.sweetalertService.showAlert(
        MessageTitle.Success,
        MessageText.PlatformUpdate,
        icon.Success,
        false,
        ConfirmButtonText.Okey,
        3
      );
    })
  }
}
