import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';
import { Create_Player } from 'src/app/contracts/player/create-player';
import { List_Player } from 'src/app/contracts/player/list-player';
import { SpinnerType } from 'src/app/enums/spinner-enum';
import { SweetHttpError } from 'src/app/internal/sweet-message/http-error';
import { SweetPlayers } from 'src/app/internal/sweet-message/players';
import { SweetalertService } from 'src/app/services/admin/sweetalert.service';
import { PlayerService } from 'src/app/services/common/models/player.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent extends BaseComponent implements OnInit {
  @ViewChild("playerForm", { static: true }) playerForm: NgForm;
  player: List_Player[] = [];
  playerName: string[] = [];
  playerValue: string = '';
  movieId: number;
  playerError:string;
  constructor(private playerService: PlayerService, private route: ActivatedRoute,
    private sweetAlertService: SweetalertService, private router: Router, spinner: NgxSpinnerService) {
    super(spinner)
  }

  ngOnInit(): void {
    this.getPlayers();
  }

  getPlayers() {
    const params = this.route.snapshot.params;
    this.playerService.getPlayersMovieById(params['id']).then((playerData: Partial<List_Player | string>) => {
      if (playerData) {
        this.player = playerData as List_Player[];
        this.movieId = params['id'];
      }
    });
  }

  addPlayer(event: any) {
    event.preventDefault();
    if (this.playerValue.trim().length >= 5) {
      this.playerName.push(this.playerValue.trim());
      this.playerValue = '';
    }else{
      this.playerError = 'En az 5 karakter olmalıdır!';
    }
  }

  create(movieId: number) {
    if (this.playerForm.valid && this.playerName.length > 0) {
      const players: Create_Player[] = this.playerName.map(name => ({
        movieId: movieId,
        playerNames: name
      }));
      players.forEach(async (actor) => {
        this.playerService.createPlayer(actor, async () => {

          const response = await this.sweetAlertService.showAlert(SweetPlayers.createPlayers);
          response.dismiss && this.router.navigate(['/Admin', 'Movies-List']);
        },
          error => {
            this.sweetAlertService.showAlert(SweetHttpError.serverError);
          });
      }
      )
    }
  }

  removePlayer(id: number) {
    this.playerService.deletePlayer(id, () => {
      this.sweetAlertService.showAlert(SweetPlayers.deletedPlayers);
    },
      error => {
        this.sweetAlertService.showAlert(SweetHttpError.serverError);
      })
      .then(() => {
        this.getPlayers();
      })
  }

  removeCreate(index: number) {
    this.playerName.splice(index, 1);
  }
}
