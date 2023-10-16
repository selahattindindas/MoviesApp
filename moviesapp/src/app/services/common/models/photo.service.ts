import { Injectable } from '@angular/core';
import { HttpClientService, } from '../http-client.service';
import { Router } from '@angular/router';
import { Create_Photo } from 'src/app/contracts/photo/add-photo';
import { Observable, firstValueFrom } from 'rxjs';
import { SweetalertService, icon } from '../../admin/sweetalert.service';
import { CancelButtonText, ConfirmButtonText, MessageText, MessageTitle } from 'src/app/internal/message-title';
import { List_Photo } from 'src/app/contracts/photo/list-photo';
import { JsonResponse } from 'src/app/contracts/response/response';
import { environment } from 'src/app/environments/environment';

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
    const observable: Observable<unknown> = this.httpClientService.post(
      {
        controller: 'Movie',
        action: 'UploadPhoto',
        queryString: id
      },
      formData
    );
  
    this.sweetAlertService.showAlert(
      MessageTitle.Success,
      MessageText.PhotoCreate,
      icon.Success,
      false,
      ConfirmButtonText.Okey,
      3
    );
  
    this.router.navigate(['/Admin', 'Movies-List']);
  
    const response = await firstValueFrom(observable);
    return response;
  }
    
  async GetPhotosMovieById(movieId: string): Promise<List_Photo | string> {
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
  async DeletePhoto(id: string){
    try {
      const result = await this.sweetAlertService.showAlert(
        MessageTitle.DeletedQuestion,
        MessageText.NoTurningBack,
        icon.Warning,
        true,
        ConfirmButtonText.Okey,
        undefined,
        CancelButtonText.Cancel
      );

      if (result.isConfirmed) {
        await firstValueFrom(this.httpClientService.delete({
          controller: 'Movie',
          action: 'DeleteMoviePhoto'
        }, id));

        this.sweetAlertService.showAlert(
          MessageTitle.Success,
          MessageText.MovieDelete,
          icon.Success,
          false,
          ConfirmButtonText.Okey,
          3
        );
      }
    } catch (error) {
      console.error(error);
    }
  }
}
