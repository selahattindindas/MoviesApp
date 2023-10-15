import { Injectable } from '@angular/core';
import { HttpClientService, } from '../http-client.service';
import { Router } from '@angular/router';
import { Create_Photo } from 'src/app/contracts/photo/add-photo';
import { Observable, firstValueFrom } from 'rxjs';
import { SweetalertService, icon } from '../../admin/sweetalert.service';
import { ConfirmButtonText, MessageText, MessageTitle } from 'src/app/internal/message-title';
import { List_Photo } from 'src/app/contracts/photo/list-photo';
import { JsonResponse } from 'src/app/contracts/response/response';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(private httpClientService: HttpClientService, private router: Router, private sweetAlertService: SweetalertService) { }

  async uploadPhoto(files: Create_Photo[]) {
    const formData: FormData = new FormData();
    files.forEach(photo => {
      formData.append('Files', photo.files, photo.files.name);
    });

    const id = `Id=${files.map(photo => photo.id).join('&Id=')}`;
    const observable: Observable<unknown> = this.httpClientService.post({
        controller: 'Movie',
        action: 'UploadPhoto',
        queryString: id
      }, formData);

      this.sweetAlertService.showAlert(
        MessageTitle.Success,
        MessageText.PhotoCreate,
        icon.Success,
        false,
        ConfirmButtonText.Okey,
        3);

      this.router.navigate(['/Admin', 'Movies-List']);

    const data = await firstValueFrom(observable);
    return data;
  }
  async GetPhotosMovieById(movieId: string): Promise<List_Photo | string> {
    const observable: Observable<JsonResponse<List_Photo>> = this.httpClientService.get({
        controller: 'Movie',
        action: `GetMoviePhotos/${movieId}`
    });

    const response = await firstValueFrom(observable);
    return response.statusCode === 200
    ? response.result
    : response.statusMessage;
}

}
