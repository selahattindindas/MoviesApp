export class Create_Player{
    movieId: number;
    playerNames: string;
  
    constructor(movieId: number, playerNames: string) { 
      this.movieId = movieId;
      this.playerNames = playerNames;
    }
}