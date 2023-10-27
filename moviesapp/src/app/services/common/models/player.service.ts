import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Router } from '@angular/router';
import { SweetalertService } from '../../admin/sweetalert.service';
import { Create_Player } from 'src/app/contracts/player/create-player';
import { Observable, firstValueFrom } from 'rxjs';
import { ConfirmButtonText, MessageText, MessageTitle } from 'src/app/internal/message-title';
import { List_Player } from 'src/app/contracts/player/list-player';
import { JsonResponse } from 'src/app/contracts/response/response';
import { MessageType } from 'src/app/enums/sweetalert-enum';

@Injectable({
  providedIn: 'root'
})

export class PlayerService {

  constructor(private httpClientService: HttpClientService, private router: Router, private sweetAlertService: SweetalertService) { }

  async getPlayersMovieById(movieId: number){
    const observable: Observable<JsonResponse<List_Player>> = this.httpClientService.get(
      {
        controller: 'Players',
        action: 'GetPlayersByMovieId'
      }, movieId);

    const response = await firstValueFrom(observable);

    return response.statusCode === 200
      ? response.result
      : response.statusMessage;
  }

  async createPlayer(player: Create_Player) {
    const observable: Observable<Create_Player> = this.httpClientService.post(
      {
        controller: 'Players',
        action: 'CreatePlayers',
        queryString: `Id=${player.movieId}&PlayerNames=${player.playerNames}`
      }, player);

    const data = await firstValueFrom(observable);

    this.sweetAlertService.showAlert({
      messageTitle: MessageTitle.Success,
      messageText: MessageText.PlayerCreate,
      icon: MessageType.Success,
      confirmButtonText: ConfirmButtonText.Okey,
      delay: 1
    });

    this.router.navigate(['/Admin', 'Movies-List']);

    return data;
  }

  async deletePlayer(id: number) {
    const observable: Observable<JsonResponse<List_Player>> = this.httpClientService.delete(
      { controller: 'Players', action: 'DeletePlayer' }, id);

    const response = await firstValueFrom(observable);

    if (response.statusCode === 200) {
      this.sweetAlertService.showAlert({
        messageTitle: MessageTitle.Success,
        messageText: MessageText.PlayerDelete,
        icon: MessageType.Success,
        confirmButtonText: ConfirmButtonText.Okey,
        delay: 1
      });
      return response.result;
    }
    else {
      return response.statusMessage;
    }
  }
}
