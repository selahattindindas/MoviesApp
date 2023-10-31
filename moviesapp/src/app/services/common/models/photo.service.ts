import { Injectable } from '@angular/core';
import { HttpClientService, } from '../http-client.service';
import { Create_Photo } from 'src/app/contracts/photo/add-photo';
import { Observable, firstValueFrom } from 'rxjs';
import { List_Photo } from 'src/app/contracts/photo/list-photo';
import { JsonResponse } from 'src/app/contracts/response/response';
import { environment } from 'src/app/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(private httpClientService: HttpClientService) { }

  async getPhotosMovieById(movieId: number) {
    const observable: Observable<JsonResponse<List_Photo>> = this.httpClientService.get({
      controller: 'Movie',
      action: `GetMoviePhotos/${movieId}`
    });

    const response = await firstValueFrom(observable);

    if (response.statusCode === 200) {
      const result = response.result as List_Photo;

      result.photos.forEach(photo => {
        photo.path = environment.photoUrl + photo.path;
      });
      return response.result;
    } else {
      return response.statusMessage;
    }
  }

  async uploadPhoto(files: Create_Photo[], successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void) {
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
      }, formData);

    await firstValueFrom(observable)
      .then(response => {
        successCallBack();
        return response;
      })
      .catch(errorResponse => {
        errorCallBack(errorResponse);
      })
  }

  async deletePhoto(id: number, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void) {
    const observable: Observable<JsonResponse<number>> = this.httpClientService.delete({
      controller: 'Movie',
      action: 'DeleteMoviePhoto'
    }, id);

    await firstValueFrom(observable)
      .then(response => {
        successCallBack();
        return response.statusCode === 200 && response.result;
      })
      .catch(errorResponse => {
        errorCallBack(errorResponse);
      })
  }
}
