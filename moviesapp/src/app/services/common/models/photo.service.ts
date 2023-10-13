import { Injectable } from '@angular/core';
import { HttpClientService, RequestParameters } from '../http-client.service';
import { Router } from '@angular/router';
import { Create_Photo } from 'src/app/contracts/photo/add-photo';
import { Observable, firstValueFrom } from 'rxjs';
import { SweetalertService, icon } from '../../admin/sweetalert.service';
import { ConfirmButtonText, MessageText, MessageTitle } from 'src/app/internal/message-title';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(private httpClientService: HttpClientService, private router: Router, private sweetAlertService: SweetalertService) { }

  async post(file: any, movieId:string) {
    const observable: Observable<Create_Photo> = this.httpClientService.post(
      { controller: 'Movie', action: 'UploadPhoto', queryString: `Id=${movieId}` },file);
    const data = await firstValueFrom(observable)
    this.sweetAlertService.showAlert(
      MessageTitle.Success, MessageText.PlayerCreate, icon.Success, false, ConfirmButtonText.Okey, 3);
    this.router.navigate(['/Admin', 'Movies-List']);
    return data;
  }
  async posta(file:File, movieId:string) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('movieId', movieId);
    this.httpClientService.post(
      { controller: 'Movie', action: 'UploadPhoto', queryString: `Id=${movieId}` }, formData);
  }
  async uploadFile(formData: FormData, movieId:string): Promise<Observable<any>> {
    return this.httpClientService.post({ controller: 'Movie', action: 'UploadPhoto', queryString: `Id=${movieId}` }, formData);
  }
}
