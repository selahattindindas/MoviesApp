import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Create_Movie } from 'src/app/contracts/movie/create-movie';
import { Observable, firstValueFrom } from 'rxjs';
import { List_Movie } from 'src/app/contracts/movie/list-movie';
import { Update_Movie } from 'src/app/contracts/movie/update-movie';
import { JsonResponse } from 'src/app/contracts/response/response';
import { PlatformDescription, PlatformEnum } from 'src/app/enums/platform-enum';
import { CategoryEnum } from 'src/app/enums/category-enum';
import { DateEnum } from 'src/app/enums/date-enum';


@Injectable({
  providedIn: 'root'
})

export class MoviesService {

  constructor(private httpClientService: HttpClientService) { }
  async getAllMovies(platform?: PlatformEnum, date?: DateEnum) {
    const observable: Observable<JsonResponse<List_Movie[]>> = this.httpClientService.get({
      controller: 'Movie',
      action: 'GetAll'
    });
  
    const response = await firstValueFrom(observable);
  
    if (response.statusCode === 200) {
      const currentDate = new Date();
      const movieVisionDate = new Date(currentDate);
      movieVisionDate.setDate(movieVisionDate.getDate() + 42);
  
      const filteredMovies = response.result.filter(movie => {
        if (platform && movie.platformName !== PlatformDescription[platform]) {
          return false;
        }
  
        const [day, month, year] = movie.releaseDate.split('.').map(Number);
        const movieDate = new Date(year, month - 1, day);
  
        switch (date) {
          case DateEnum.VizyondanKalkan:
            return movieDate < currentDate;
          case DateEnum.Yakinda:
            return movieDate > movieVisionDate;
          case DateEnum.Vizyonda:
            return movieDate >= currentDate && movieDate <= movieVisionDate;
          default:
            return true;
        }
      });
  
      return filteredMovies;
    } else {
      console.error('Error fetching movies:', response.statusMessage);
      return response.statusMessage;
    }
  }
  
  async getMovieById(id: number) {
    const observable: Observable<JsonResponse<List_Movie>> = this.httpClientService.get({
      controller: 'Movie',
      action: 'GetByMovieId'
    }, id);

    const response = await firstValueFrom(observable);

    return response.statusCode === 200
      ? response.result
      : response.statusMessage;
  }

  async createMovie(movie: Create_Movie, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void) {
    const observable: Observable<Create_Movie> = this.httpClientService.post({
      controller: 'Movie',
      action: 'CreateMovie'
    }, movie);

    await firstValueFrom(observable)
      .then(response => {
        successCallBack();
        return response;
      })
      .catch(errorResponse => {
        errorCallBack(errorResponse.error.message);
      });
  }

  async updateMovie(movie: Update_Movie, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void) {
    const observable: Observable<Update_Movie> = this.httpClientService.put({
      controller: 'Movie',
      action: 'UpdateMovie'
    }, movie);

    await firstValueFrom(observable)
      .then(response => {
        successCallBack();
        return response;
      })
      .catch(errorResponse => {
        errorCallBack(errorResponse);
      });
  }

  async deleteMovie(id: number, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void) {
    const observable: Observable<JsonResponse<List_Movie>> = this.httpClientService.delete(
      {
        controller: 'Movie',
        action: 'Delete'
      }, id);

    await firstValueFrom(observable)
      .then(response => {
        successCallBack();
        return response.statusCode === 200 && response.result;
      }).catch(errorResponse => {
        errorCallBack(errorResponse);
      });
  }
}

