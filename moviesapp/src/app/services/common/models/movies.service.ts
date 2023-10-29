import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Create_Movie } from 'src/app/contracts/movie/create-movie';
import { Observable, firstValueFrom } from 'rxjs';
import { List_Movie } from 'src/app/contracts/movie/list-movie';
import { Update_Movie } from 'src/app/contracts/movie/update-movie';
import { JsonResponse } from 'src/app/contracts/response/response';


@Injectable({
  providedIn: 'root'
})

export class MoviesService {

  constructor(private httpClientService: HttpClientService) { }

  async getAllMovies() {
    //try catch kalkacak // YAPILDI
      const observable: Observable<JsonResponse<List_Movie[]>> = this.httpClientService.get({
        controller: 'Movie',
        action: 'GetAll'
      });

      const response = await firstValueFrom(observable);

      return response.statusCode === 200
        ? response.result
        : response.statusMessage;
    }


  async getMovieById(id: number){
    //idler number // YAPILDI
      const observable: Observable<JsonResponse<List_Movie>> = this.httpClientService.get({
        controller: 'Movie',
        action: 'GetByMovieId'
      }, id);

      const response = await firstValueFrom(observable);

      return response.statusCode === 200
        ? response.result
        : response.statusMessage;
    } 

  async createMovie(movie: Create_Movie, successCallBack?: () => void) {
      const observable: Observable<Create_Movie> =  this.httpClientService.post({
        controller: 'Movie',
        action: 'CreateMovie'
      }, movie);
   
        const response = await firstValueFrom(observable);
        successCallBack();
        
        return response;
      }
      // sweatalert onaylandıktan sonra yönlendirme olucak // yapıldı
      
  async updateMovie(movie: Update_Movie, successCallBack?: () => void) {
      const observable: Observable<Update_Movie> = this.httpClientService.put({
        controller: 'Movie',
        action: 'UpdateMovie'
      }, movie);

      const response = await firstValueFrom(observable);
      
      successCallBack();
     
      return response;
  }

  async deleteMovie(id: number, successCallBack?: () => void) {
    const observable: Observable<JsonResponse<List_Movie>> = this.httpClientService.delete(
      {
        controller: 'Movie',
        action: 'Delete'
      }, id);

    const response = await firstValueFrom(observable);

    successCallBack();

    return response.statusCode ===200
    ? response.result
    : response.statusMessage;
  }
}

