export class Create_Player{
    movieId: string;
    playerNames: string;
  
    constructor(movieId: string, playerNames: string) { 
      this.movieId = movieId;
      this.playerNames = playerNames;
    }
}