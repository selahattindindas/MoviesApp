import { Injectable } from '@angular/core';
import { HttpClientService, RequestParameters } from '../http-client.service';
import { Create_Movie } from 'src/app/contracts/movie/create_movie';
import { SweetalertService, icon } from '../../admin/sweetalert.service';
import { Observable, firstValueFrom } from 'rxjs';
import { List_Movie } from 'src/app/contracts/movie/list_movie';
import { Update_Movie } from 'src/app/contracts/movie/update_movie';
import { Router } from '@angular/router';
import { CancelButtonText, ConfirmButtonText, MessageText, MessageTitle } from 'src/app/internal/message_title';
@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private httpClientService: HttpClientService, private sweetalertService:SweetalertService, private router: Router) { }
  async create(movie: Create_Movie) {
     this.httpClientService.post({controller: "Movie"}, movie)
      .subscribe(() => {
        this.sweetalertService.showAlert(MessageTitle.Success, MessageText.CreateSuccess, icon.Success ,false, ConfirmButtonText.Okey, 3);
        this.router.navigate(['/Admin', 'Movies-List']);
      }
      );
  }
  async delete(id: string) {
      const result = await this.sweetalertService.showAlert(MessageTitle.Deleted, MessageText.DeleteWarning, icon.Warning,
        true, ConfirmButtonText.Okey, undefined, CancelButtonText.Cancel);
      if (result && result.isConfirmed) {
        await firstValueFrom(
           this.httpClientService.delete<any>({ controller: 'Movie' }, id)
        );
        this.sweetalertService.showAlert(MessageTitle.Success, MessageText.DeleteSuccess, icon.Success ,false, ConfirmButtonText.Okey, 3);
      }
  } 
  async get():Promise<Partial<List_Movie[]>>{
    const observable: Observable<List_Movie[]> = this.httpClientService.get<List_Movie[]> ({
      controller: 'Movie', 
    });
    const data = await firstValueFrom(observable);
    return data;
  }
  async getMovieId(id: string): Promise<Partial<Update_Movie>> {
  const observable: Observable<Update_Movie> = this.httpClientService.get<Update_Movie>({
    controller: 'Movie',
  }, id);
    const data = await firstValueFrom(observable);
    return data;
}
  async updateMovie(movie: Create_Movie, id: string):Promise <void>{
    this.httpClientService.put({
      controller: "Movie",
      action: id
      
    }, movie).subscribe(
      () => {
        this.sweetalertService.showAlert(MessageTitle.Success, MessageText.UpdateSuccess, icon.Success ,false, ConfirmButtonText.Okey, 3);
        this.router.navigate(['/Admin', 'Movies-List']);
      }
    );
  }
}


