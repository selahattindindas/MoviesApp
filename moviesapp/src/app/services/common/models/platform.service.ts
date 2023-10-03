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

@Injectable({
  providedIn: 'root'
})
export class PlatformService {

  constructor(private httpClientService: HttpClientService, private sweetalertService: SweetalertService, private router: Router) { }
  getPlatformEnumValues(): PlatformEnum[] {
    const enumValues = Object.values(PlatformEnum) as PlatformEnum[];
    return enumValues.filter((value) => typeof value === 'number');
  }
  getPlatformDescriptions(): { [key in number]: string } {
    return PlatformDescription;
  }
  async post(platform: Create_Platform, name:string){
    const observable: Observable<Create_Platform> = this.httpClientService.post<Create_Platform>(
      {controller:'Platform', action:'CreatePlatform', queryString:`platformName=${name}`},platform);
    const data = await firstValueFrom(observable)
      this.sweetalertService.showAlert(
        MessageTitle.Success,MessageText.PlatformCreate,icon.Success,false,ConfirmButtonText.Okey,3 );
        this.router.navigate(['/Admin', 'Class-List']);
        return data;
    }
  async get():Promise<List_Platform[]> {
    const observable :Observable<any> = this.httpClientService.get(
      {controller: 'Platform', action:'GetAllPlatforms'});
    const response = await firstValueFrom(observable);
    if(response.statusCode === 200){
      console.log(response.statusMessage);
      return response.result;
    }else {
      throw new Error(`${response.statusCode}`);
    }
  }
  async getPlatformId(id: string): Promise<List_Platform> {
    const observable: Observable<any> = this.httpClientService.get(
        {controller: 'Platform',action:'GetByPlatformId'},id);
    const response = await firstValueFrom(observable);
    if(response.statusCode === 200){
      console.log(response.statusMessage);
      return response.result;
    }else {
      throw new Error(`${response.statusCode}`);
    }
  }
  async delete(id:string){
    const  sweetalert = await this.sweetalertService.showAlert(
      MessageTitle.Deleted,MessageText.DeleteWarning,icon.Warning,true,ConfirmButtonText.Okey,undefined,CancelButtonText.Cancel);
    if(sweetalert && sweetalert.isConfirmed){
      await firstValueFrom(this.httpClientService.delete<any>({controller:'Platform', action:'DeletePlatform'},id));
      this.sweetalertService.showAlert(MessageTitle.Success,
        MessageText.PlatformDelete,icon.Success,false,ConfirmButtonText.Okey,3)
    }
  }
  async put(platform:Update_Platform,id:string, name:string){
    const observable: Observable<Update_Platform> = this.httpClientService.put<Update_Platform>(
      {controller:'Platform', action:`UpdatePlatform/${id}`, queryString:`platformName=${name}`},platform);
      const data = await firstValueFrom(observable);
      this.sweetalertService.showAlert(
        MessageTitle.Success,MessageText.PlatformUpdate,icon.Success,false,ConfirmButtonText.Okey,3);
        this.router.navigate(['/Admin', 'Class-List']);
    }
  }

