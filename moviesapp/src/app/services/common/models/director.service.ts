import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Router } from '@angular/router';
import { Create_Director } from 'src/app/contracts/director/create-director';
import { Observable, firstValueFrom } from 'rxjs';
import { SweetalertService } from '../../admin/sweetalert.service';
import { ConfirmButtonText, MessageText, MessageTitle } from 'src/app/internal/message-title';
import { List_Director } from 'src/app/contracts/director/list-director';
import { JsonResponse } from 'src/app/contracts/response/response';
import { MessageType } from 'src/app/enums/sweetalert-enum';

@Injectable({
  providedIn: 'root'
})

export class DirectorService {

  constructor(private httpClientService: HttpClientService, private router: Router, private sweetAlertService: SweetalertService) { }

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

  async createDirector(director: Create_Director) {
    const observable: Observable<Create_Director> = this.httpClientService.post(
      {
        controller: 'Director',
        action: 'CreateDirectors',
        queryString: `Id=${director.movieId}&DirectorNames=${director.directorNames}`
      }, director);

    const data = await firstValueFrom(observable)
    this.sweetAlertService.showAlert({
      messageTitle: MessageTitle.Success,
      messageText: MessageText.DirectorCreate,
      icon: MessageType.Success,
      confirmButtonText: ConfirmButtonText.Okey,
      delay: 1
    });

    this.router.navigate(['/Admin', 'Movies-List']);

    return data;
  }

  async deleteDirector(id: number) {
    const observable: Observable<JsonResponse<List_Director>> = this.httpClientService.delete(
      {
        controller: 'Director',
        action: 'DeleteDirector'
      }, id);

    const response = await firstValueFrom(observable);

    if (response.statusCode === 200) {

      this.sweetAlertService.showAlert({
        messageTitle: MessageTitle.Success,
        messageText: MessageText.DirectorDelete,
        icon: MessageType.Success,
        confirmButtonText: ConfirmButtonText.Okey,
        delay: 1
      });
      return response.result;
    } else {
      return response.statusMessage;
    }
  };
}
