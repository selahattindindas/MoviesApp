import { Injectable } from '@angular/core';
import { HttpClientService, } from '../http-client.service';
import { Router } from '@angular/router';
import { Create_Photo } from 'src/app/contracts/photo/add-photo';
import { Observable, firstValueFrom } from 'rxjs';
import { SweetalertService } from '../../admin/sweetalert.service';
import { ConfirmButtonText, MessageText, MessageTitle } from 'src/app/internal/message-title';
import { List_Photo } from 'src/app/contracts/photo/list-photo';
import { JsonResponse } from 'src/app/contracts/response/response';
import { environment } from 'src/app/environments/environment';
import { MessageType, Position } from 'src/app/enums/sweetalert-enum';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(private httpClientService: HttpClientService, private router: Router, private sweetAlertService: SweetalertService) { }

  async getPhotosMovieById(movieId: number){
    const observable: Observable<JsonResponse<List_Photo>> = this.httpClientService.get({
      controller: 'Movie',
      action: `GetMoviePhotos/${movieId}`
    });

    const response = await firstValueFrom(observable);

    if (response.statusCode === 200) {
      const result = response.result as List_Photo;

      result.photos.forEach(photo => {
        photo.path = environment.apiUrl.replace('api', '') + photo.path;
      });
      return result;
    } else {
      return response.statusMessage;
    }
  }

  async uploadPhoto(files: Create_Photo[]) {
    const formData: FormData = new FormData();
    files.forEach(photo => {
      formData.append('Files', photo.files, photo.files.name);
    });

    const id = `Id=${files.map(photo => photo.id).join('&Id=')}`;
    const observable: Observable<unknown> = this.httpClientService.post(
      {
        controller: 'Movie',
        action: 'UploadPhoto',
        queryString: id
      },
      formData
    );

    this.sweetAlertService.showAlert({
      position: Position.TopRight,
      messageTitle: MessageTitle.Success,
      messageText: MessageText.PhotoCreate,
      icon: MessageType.Success,
      timerProgressBar: true,
      toast: true,
      delay: 1,
    });

    this.router.navigate(['/Admin', 'Movies-List']);

    const response = await firstValueFrom(observable);
    return response;
  }

  async deletePhoto(id: number) {
    const observable: Observable<JsonResponse<number>> = this.httpClientService.delete({
      controller: 'Movie',
      action: 'DeleteMoviePhoto'
    }, id);

    const response = await firstValueFrom(observable);

    if (response.statusCode == 200) {
      this.sweetAlertService.showAlert({
        position: Position.TopRight,
        messageTitle: MessageTitle.Success,
        messageText: MessageText.PhotoDelete,
        icon: MessageType.Success,
        timerProgressBar: true,
        toast: true,
        delay: 1,
      });
      return response.result
    } else {
      return response.statusMessage
    }
  }
}
