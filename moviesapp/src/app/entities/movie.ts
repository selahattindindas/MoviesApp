
export class Actor {
  id: number;
  movieId: number;
  name: string;
  constructor(id:number, name:string, movieId:number){
    this.id = id;
    this.name = name;
    this.movieId = movieId;
  }
}

export class Director {
  id: number;
  movieId: number;
  name: string;
  constructor(id:number, name:string, movieId:number){
    this.id = id;
    this.name = name;
    this.movieId = movieId;
  }
}

export class Movie {
  id: number;
  movieName: string;
  categoryId: number;
  platformId: number;
  movieDirectors: Director[];
  movieActors: Actor[];
  movieDetails: string;
    constructor(
    id: number,
    movieName: string,
    categoryId: number,
    platformId: number,
    movieDirectors: Director[],
    movieActors: Actor[],
    movieDetails: string
  ) {
    this.id = id;
    this.movieName = movieName;
    this.categoryId = categoryId;
    this.platformId = platformId;
    this.movieDirectors = movieDirectors;
    this.movieActors = movieActors;
    this.movieDetails = movieDetails;
  }

}
