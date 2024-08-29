import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Create_Player } from 'src/app/contracts/player/create-player';
import { List_Player } from 'src/app/contracts/player/list-player';
import { SweetStatus } from 'src/app/internal/sweet-alert/sweet-alert.status';
import { SweetalertService } from 'src/app/services/admin/sweetalert.service';
import { PlayerService } from 'src/app/services/common/models/player.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {
  @Input() data!: { movieId: number };
  players: List_Player[] = [];
  
  constructor(
    private playerService: PlayerService,
    private sweetAlertService: SweetalertService,
    private activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.getPlayers();
  }

  getPlayers() {
    if (this.data && this.data.movieId) {
      this.playerService.getPlayersMovieById(this.data.movieId).then((playerData: Partial<List_Player | string>) => {
        if (playerData) {
          this.players = playerData as List_Player[];
        }
      });
    }
  }

  onSubmit(create: Create_Player) {
    const players = {
      ...create,
      movieId: this.data.movieId,
    };
    this.playerService.createPlayer(players, () => {
      this.sweetAlertService.showAlert(SweetStatus.sweetSuccess);
      this.getPlayers()
    },
      error => {

      }).then(() => {
        this.getPlayers();
      });
  }

  removePlayer(id: number) {
    this.playerService.deletePlayer(id, () => {
      this.sweetAlertService.showAlert(SweetStatus.sweetSuccess);
    },
      error => {
      })
      .then(() => {
        this.getPlayers();
      })
  }

  close() {
    this.activeModal.close();
  }
}
