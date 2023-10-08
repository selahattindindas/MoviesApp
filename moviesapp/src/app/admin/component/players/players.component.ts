import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Create_Player } from 'src/app/contracts/player/create-player';
import { List_Player } from 'src/app/contracts/player/list-player';
import { PlayerService } from 'src/app/services/common/models/player.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {
  createForm:FormGroup;
  movieId: string;
  player: List_Player[];
  playerNames: string[] = [];
  playerValue: string = ''; 
  constructor(private playerService:PlayerService, private fb:FormBuilder, private activatedRoute:ActivatedRoute){
    this.createForm = this.fb.group({
      id: new FormControl(''),
      name: new FormControl('')
    })
  }
  ngOnInit(): void {
    this.getPlayers();
  }
  getPlayers(){
      this.activatedRoute.params.subscribe(async (params) => {
        const playerData: Partial<List_Player> = await this.playerService.getPlayersMovieById(params['id']);
        if (playerData) {
          this.player = playerData as List_Player[];
          this.movieId = params['id']; 
        }
      });
  }
  addPlayer(event:any){
    event.preventDefault();
    if (this.playerValue.trim() !== '') {
      this.playerNames.push(this.playerValue.trim()); 
      this.playerValue = '';
    }
  }
  create(){
    if(this.createForm.valid && this.playerNames.length>0){
      const formData = this.createForm.value;
      const player: Create_Player[] = this.playerNames.map(name => ({
        movieId: formData.id,
        playerNames: name
      }));
      for (const actor of player) {
        this.playerService.createPlayer(actor, this.movieId,actor.playerNames );
      }
    }
  }
  removePlayer(id: string){
    this.playerService.deletePlayer(id).then(()=>{
      this.getPlayers();
    })
  }
  removeCreate(index:number){
    this.playerNames.splice(index, 1);
  }
}
