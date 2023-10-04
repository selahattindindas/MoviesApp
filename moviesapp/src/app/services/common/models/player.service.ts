import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Router } from '@angular/router';
import { SweetalertService, icon } from '../../admin/sweetalert.service';
import { Create_Player } from 'src/app/contracts/player/create-player';
import { Observable, firstValueFrom } from 'rxjs';
import { ConfirmButtonText, MessageText, MessageTitle } from 'src/app/internal/message-title';
import { List_Player } from 'src/app/contracts/player/list-player';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(private httpClientService: HttpClientService, private router:Router,  private sweetAlertService:SweetalertService) { }
  async post(director: Create_Player,id:string, name:string){
    const observable: Observable<Create_Player> = this.httpClientService.post<Create_Player>(
      {controller:'Players', action:`CreatePlayers/${id}`, queryString:`playerNames=${name}`},director);
    const data = await firstValueFrom(observable)
      this.sweetAlertService.showAlert(
        MessageTitle.Success,MessageText.PlatformCreate,icon.Success,false,ConfirmButtonText.Okey,3 );
        this.router.navigate(['/Admin', 'Movies-List']);
        return data;
    }
    async getPlayerId(id: string): Promise<List_Player> {
      const observable: Observable<any> =
        this.httpClientService.get({controller: 'Players', action:'GetPlayersByMovieId'},id);
      const response = await firstValueFrom(observable);
      if(response.statusCode === 200){
        console.log(response.statusMessage);
        return response.result;
      }else {
        throw new Error(`${response.statusCode}`);
      }
    }
    async delete(id: string) {
      const observable: Observable<any> = this.httpClientService.delete<any>(
        { controller: 'Players', action:'DeletePlayer' }, id);
        const response = await firstValueFrom(observable);
        if(response.statusCode === 200){
          console.log(response.statusMessage);
          return response.result;
        }else {
          throw new Error(`${response.statusCode}`);
        }
    }
}
