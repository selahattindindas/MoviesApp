export class Create_Player{
    movieId: string;
    directorNames: string;
  
    constructor(movieId: string, directorNames: string) { 
      this.movieId = movieId;
      this.directorNames = directorNames;
    }
}