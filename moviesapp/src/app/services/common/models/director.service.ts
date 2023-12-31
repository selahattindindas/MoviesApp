import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Create_Director } from 'src/app/contracts/director/create-director';
import { Observable, firstValueFrom } from 'rxjs';
import { List_Director } from 'src/app/contracts/director/list-director';
import { JsonResponse } from 'src/app/contracts/response/response';


@Injectable({
  providedIn: 'root'
})

export class DirectorService {

  constructor(private httpClientService: HttpClientService) { }

  async getDirectorsMovieById(movieId: number) {
    const observable: Observable<JsonResponse<List_Director>> = this.httpClientService.get(
      {
        controller: 'Director',
        action: 'GetDirectorsByMovieId'
      }, movieId);

    const response = await firstValueFrom(observable);

    return response.statusCode === 200
      ? response.result
      : response.statusMessage;
  }

  async createDirector(director: Create_Director, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void) {
    const observable: Observable<Create_Director> = this.httpClientService.post(
      {
        controller: 'Director',
        action: 'CreateDirectors',
        queryString: `Id=${director.movieId}&DirectorNames=${director.directorNames}`
      }, director);

    await firstValueFrom(observable)
      .then(response => {
        successCallBack();
        return response;
      })
      .catch(errorResponse => {
        errorCallBack(errorResponse);
      });
  }

  async deleteDirector(id: number, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void) {
    const observable: Observable<JsonResponse<List_Director>> = this.httpClientService.delete(
      {
        controller: 'Director',
        action: 'DeleteDirector'
      }, id);

    await firstValueFrom(observable)
      .then(response => {
        successCallBack();
        return response.statusCode === 200 && response.result;
      })
      .catch(errorResponse => {
        errorCallBack(errorResponse);
      });
  }
}
