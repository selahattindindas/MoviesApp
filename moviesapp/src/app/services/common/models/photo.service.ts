import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
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

  async post(photo: Create_Photo, id: string) {
    const observable: Observable<Create_Photo> = this.httpClientService.post<Create_Photo>(
      { controller: 'Movie', action: 'UploadPhoto', queryString: `id=${id}` }, photo);
    const data = await firstValueFrom(observable)
    this.sweetAlertService.showAlert(
      MessageTitle.Success, MessageText.PlayerCreate, icon.Success, false, ConfirmButtonText.Okey, 3);
    this.router.navigate(['/Admin', 'Movies-List']);
    return data;
  }
}
