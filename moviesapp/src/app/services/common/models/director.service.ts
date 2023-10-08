import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Router } from '@angular/router';
import { Create_Director } from 'src/app/contracts/director/create-director';
import { Observable, firstValueFrom } from 'rxjs';
import { SweetalertService, icon } from '../../admin/sweetalert.service';
import { ConfirmButtonText, MessageText, MessageTitle } from 'src/app/internal/message-title';
import { List_Director } from 'src/app/contracts/director/list-director';
import { JsonResponse } from 'src/app/contracts/response/response';

@Injectable({
  providedIn: 'root'
})
export class DirectorService {

  constructor(private httpClientService: HttpClientService, private router: Router, private sweetAlertService: SweetalertService) { }

  async getDirectorsMovieById(id: string): Promise<List_Director> {
    const observable: Observable<JsonResponse<List_Director>> =
      this.httpClientService.get({ controller: 'Director', action: 'GetDirectorsByMovieId' }, id);
    const response = await firstValueFrom(observable);

    return response.statusCode === 200
      ? response.result
      : response.statusMessage;
  }

  async createDirector(director: Create_Director, id: string, name: string) {
    const observable: Observable<Create_Director> = this.httpClientService.post<Create_Director>(
      { controller: 'Director', action: `CreateDirectors/${id}`, queryString: `directorNames=${name}` }, director);
    const data = await firstValueFrom(observable)
    this.sweetAlertService.showAlert(
      MessageTitle.Success, MessageText.DirectorCreate, icon.Success, false, ConfirmButtonText.Okey, 3);
    this.router.navigate(['/Admin', 'Movies-List']);
    return data;
  }

  async deleteDirector(id: string) {
    const observable: Observable<any> = this.httpClientService.delete(
      { controller: 'Director', action: 'DeleteDirector' }, id);
    const response = await firstValueFrom(observable);
    if (response.statusCode === 200) {
      console.log(response.statusMessage);
      this.sweetAlertService.showAlert(MessageTitle.Success,
        MessageText.DirectorDelete, icon.Success, false, ConfirmButtonText.Okey, 3)
      return response.result;
    } else {
      throw new Error(`${response.statusCode}`);
    }
  }
}
