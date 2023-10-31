import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Create_Player } from 'src/app/contracts/player/create-player';
import { Observable, firstValueFrom } from 'rxjs';
import { List_Player } from 'src/app/contracts/player/list-player';
import { JsonResponse } from 'src/app/contracts/response/response';

@Injectable({
  providedIn: 'root'
})

export class PlayerService {

  constructor(private httpClientService: HttpClientService) { }

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

  async createPlayer(player: Create_Player, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void) {
    const observable: Observable<Create_Player> = this.httpClientService.post(
      {
        controller: 'Players',
        action: 'CreatePlayers',
        queryString: `Id=${player.movieId}&PlayerNames=${player.playerNames}`
      }, player);

      await firstValueFrom(observable)
      .then(response => {
        successCallBack();
        return response;
      })
      .catch(errorResponse => {
        errorCallBack(errorResponse);
      });
  }

  async deletePlayer(id: number, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void) {
    const observable: Observable<JsonResponse<List_Player>> = this.httpClientService.delete(
      { 
        controller: 'Players', 
        action: 'DeletePlayer' 
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
