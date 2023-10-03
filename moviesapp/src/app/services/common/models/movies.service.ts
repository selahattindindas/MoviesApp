import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Create_Movie } from 'src/app/contracts/movie/create-movie';
import { SweetalertService, icon } from '../../admin/sweetalert.service';
import { Observable, firstValueFrom } from 'rxjs';
import { List_Movie } from 'src/app/contracts/movie/list-movie';
import { Update_Movie } from 'src/app/contracts/movie/update-movie';
import { Router } from '@angular/router';
import {CancelButtonText,ConfirmButtonText,MessageText,MessageTitle} from 'src/app/internal/message-title';
@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  constructor(private httpClientService: HttpClientService,private sweetalertService: SweetalertService,private router: Router) {}
  async create(movie: Create_Movie) {
    const observable : Observable<Create_Movie> = this.httpClientService.post<Create_Movie>({
    controller: 'Movie',action:'CreateMovie'},movie);
      const data = await firstValueFrom(observable);
      this.sweetalertService.showAlert(
      MessageTitle.Success,MessageText.MovieCreate,icon.Success,false,ConfirmButtonText.Okey,3
     );
      this.router.navigate(['/Admin', 'Movies-List']);
      return data;
}
  async delete(id: string) {
    const result = await this.sweetalertService.showAlert(
      MessageTitle.Deleted,MessageText.DeleteWarning,icon.Warning,true,ConfirmButtonText.Okey,undefined,CancelButtonText.Cancel);
    if (result && result.isConfirmed) {
      await firstValueFrom(
        this.httpClientService.delete<any>({ controller: 'Movie', action:'Delete' }, id)
      );
      this.sweetalertService.showAlert(
        MessageTitle.Success, MessageText.MovieDelete, icon.Success, false,ConfirmButtonText.Okey,3);
    }
  }
  async get(): Promise<Partial<List_Movie[]>> {
    const observable: Observable<List_Movie[]> = this.httpClientService.get<List_Movie[]>(
      {controller: 'Movie',action:'GetAll'});
    const data = await firstValueFrom(observable);
    return data;
  }
  async getMovieId(id: string): Promise<Partial<List_Movie>> {
    const observable: Observable<List_Movie> =
      this.httpClientService.get<List_Movie>({controller: 'Movie', action:'GetByMovieId'},id);
    const data = await firstValueFrom(observable);
    return data;
  }
  async updateMovie(movie: Update_Movie, id: string){
    const observable: Observable<Update_Movie> = this.httpClientService.put<Update_Movie>(
      {controller: 'Movie', action:`UpdateMovie/${id}`},movie);
      const data = await firstValueFrom(observable);
        this.sweetalertService.showAlert(
        MessageTitle.Success,MessageText.MovieUpdate,icon.Success,false,ConfirmButtonText.Okey,3 );
        this.router.navigate(['/Admin', 'Movies-List']);
        return data;
  }
}
