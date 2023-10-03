import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Router } from '@angular/router';
import { Create_Director } from 'src/app/contracts/director/create-director';
import { Observable, firstValueFrom } from 'rxjs';
import { SweetalertService, icon } from '../../admin/sweetalert.service';
import { ConfirmButtonText, MessageText, MessageTitle } from 'src/app/internal/message-title';

@Injectable({
  providedIn: 'root'
})
export class DirectorService {

  constructor(private httpClientService:HttpClientService, private router:Router, private sweetAlertService:SweetalertService) { }
  async post(director: Create_Director,id:string, name:string){
    const observable: Observable<Create_Director> = this.httpClientService.post<Create_Director>(
      {controller:'Director', action:`CreateDirectors/${id}`, queryString:`directorNames=${name}`},director);
    const data = await firstValueFrom(observable)
      this.sweetAlertService.showAlert(
        MessageTitle.Success,MessageText.PlatformCreate,icon.Success,false,ConfirmButtonText.Okey,3 );
        this.router.navigate(['/Admin', 'Movies-List']);
        return data;
    }
}
