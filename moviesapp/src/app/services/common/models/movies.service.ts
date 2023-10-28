import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Create_Movie } from 'src/app/contracts/movie/create-movie';
import { SweetalertService } from '../../admin/sweetalert.service';
import { Observable, firstValueFrom } from 'rxjs';
import { List_Movie } from 'src/app/contracts/movie/list-movie';
import { Update_Movie } from 'src/app/contracts/movie/update-movie';
import { Router } from '@angular/router';
import { CancelButtonText, ConfirmButtonText, MessageText, MessageTitle } from 'src/app/internal/message-title';
import { JsonResponse } from 'src/app/contracts/response/response';
import { MessageType, Position } from 'src/app/enums/sweetalert-enum';

@Injectable({
  providedIn: 'root'
})

export class MoviesService {

  constructor(private httpClientService: HttpClientService, private sweetAlertService: SweetalertService, private router: Router) { }

  async getAllMovies(): Promise<List_Movie[] | string> {
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
      const result = this.httpClientService.post({
        controller: 'Movie',
        action: 'CreateMovie'
      }, movie);
   
        const data = await firstValueFrom(result);
        successCallBack();
        
        return data;
      }
      // sweatalert onaylandıktan sonra yönlendirme olucak
      
  async updateMovie(movie: Update_Movie) {
      const observable: Observable<Update_Movie> = this.httpClientService.put({
        controller: 'Movie',
        action: 'UpdateMovie'
      }, movie);

      const data = await firstValueFrom(observable);

      this.sweetAlertService.showAlert({
        position: Position.TopRight,
        messageTitle: MessageTitle.Success,
        messageText: MessageText.MovieUpdate,
        icon: MessageType.Success,
        timerProgressBar: true,
        toast: true,
        delay: 1,
      });

      this.router.navigate(['/Admin', 'Movies-List']);

      return data;
  }

  async deleteMovie(id: number) {
    const sweetalert = await this.sweetAlertService.showAlert({
      position: Position.Center,
      messageTitle: MessageTitle.DeletedQuestion,
      messageText: MessageText.NoTurningBack,
      icon: MessageType.Warning,
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: ConfirmButtonText.Okey,
      cancelButtonText: CancelButtonText.Cancel,
    });

      if (sweetalert.isConfirmed) {
        await firstValueFrom(this.httpClientService.delete({
          controller: 'Movie',
          action: 'Delete'
        }, id));

        this.sweetAlertService.showAlert({
          position: Position.TopRight,
          messageTitle: MessageTitle.Success,
          messageText: MessageText.MovieDelete,
          icon: MessageType.Success,
          timerProgressBar: true,
          toast: true,
          delay: 1,
        });
      }
  }
}

