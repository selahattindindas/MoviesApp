import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { find } from 'rxjs';
import { Create_Player } from 'src/app/contracts/player/create-player';
import { List_Player } from 'src/app/contracts/player/list-player';
import { PlayerService } from 'src/app/services/common/models/player.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {
  @ViewChild("playerForm", { static: true }) playerForm: NgForm;
  player: List_Player[] = [];
  playerName: string[] = [];
  playerValue: string = '';
  movieId: string;
  constructor(private playerService: PlayerService, private route:ActivatedRoute) {}

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
    if (this.playerValue.trim() !== '') {
      this.playerName.push(this.playerValue.trim());
      this.playerValue = '';
    }
  }
  create(movieId: string) {
    if (this.playerForm.valid && this.playerName.length > 0) {
      const player: Create_Player[] = this.playerName.map(name => ({
        movieId: movieId, // Değişken "movieId" kullanılıyor
        playerNames: name
      }));
      for (const actor of player) {
        this.playerService.createPlayer(actor);
      }
    }
  }
  
  removePlayer(id: string) {
    this.playerService.deletePlayer(id).then(() => {
      this.getPlayers();
    })
  }
  removeCreate(index: number) {
    this.playerName.splice(index, 1);
  }
}
