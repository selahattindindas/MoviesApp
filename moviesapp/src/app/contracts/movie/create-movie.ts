export class Create_Movie {
  movieName: string;
  description: string;
  releaseDate: Date;
  director: string;
  categoryId: number;
  platformId: number;
  movieTime: Date;

  constructor(
    movieName: string,
    description: string,
    releaseDate: Date,
    director: string,
    categoryId: number,
    platformId: number,
    movieTime: Date
  ) {

    this.movieName = movieName;
    this.description = description;
    this.releaseDate = releaseDate;
    this.director = director;
    this.categoryId = categoryId;
    this.platformId = platformId;
    this.movieTime = movieTime;
  }
}
