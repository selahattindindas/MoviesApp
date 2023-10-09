import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Create_Movie } from 'src/app/contracts/movie/create-movie';
import { SweetalertService, icon } from '../../admin/sweetalert.service';
import { Observable, firstValueFrom } from 'rxjs';
import { List_Movie } from 'src/app/contracts/movie/list-movie';
import { Update_Movie } from 'src/app/contracts/movie/update-movie';
import { Router } from '@angular/router';
import { CancelButtonText, ConfirmButtonText, MessageText, MessageTitle } from 'src/app/internal/message-title';
import { JsonResponse } from 'src/app/contracts/response/response';
@Injectable({
  providedIn: 'root',
})
export class MoviesService {

  constructor(private httpClientService: HttpClientService, private sweetalertService: SweetalertService, private router: Router) { }

  async getAllMovies(): Promise<List_Movie[] | string> {

    const observable: Observable<JsonResponse<List_Movie[]>> = this.httpClientService.get(
      { controller: 'Movie', action: 'GetAll' });

    const response = await firstValueFrom(observable);

    return response.statusCode === 200
      ? response.result
      : response.statusMessage;
  }

  async getMovieById(id: string): Promise<List_Movie | string> {
    const observable: Observable<JsonResponse<List_Movie>> = this.httpClientService.get(
      { controller: 'Movie', action: 'GetByMovieId' }, id);

    const response = await firstValueFrom(observable);

    return response.statusCode === 200
      ? response.result
      : response.statusMessage;
  }

  async createMovie(movie: Create_Movie) {
    const observable: Observable<Create_Movie> = this.httpClientService.post(
      {controller: 'Movie', action: 'CreateMovie'}, movie);

    const data = await firstValueFrom(observable);

    this.sweetalertService.showAlert(
      MessageTitle.Success, MessageText.MovieCreate, icon.Success, false, ConfirmButtonText.Okey, 3
    );

    this.router.navigate(['/Admin', 'Movies-List']);

    return data;
  }

  async updateMovie(movie: Update_Movie) {
    const observable: Observable<Update_Movie> = this.httpClientService.put(
      { controller: 'Movie', action: 'UpdateMovie' }, movie);

    const data = await firstValueFrom(observable);

    this.sweetalertService.showAlert(
      MessageTitle.Success, MessageText.MovieUpdate, icon.Success, false, ConfirmButtonText.Okey, 3);

    this.router.navigate(['/Admin', 'Movies-List']);

    return data;
  }

  async deleteMovie(id: string) {
    const result = await this.sweetalertService.showAlert(
      MessageTitle.DeletedQuestion, MessageText.NoTurningBack, icon.Warning, true, ConfirmButtonText.Okey, undefined, CancelButtonText.Cancel);
      
    if (result.isConfirmed) {
      await firstValueFrom(this.httpClientService.delete(
          { controller: 'Movie', action: 'Delete' }, id));

      this.sweetalertService.showAlert(
        MessageTitle.Success, MessageText.MovieDelete, icon.Success, false, ConfirmButtonText.Okey, 3);
    }
  }

}
