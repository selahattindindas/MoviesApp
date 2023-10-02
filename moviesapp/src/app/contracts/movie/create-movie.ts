export class Create_Movie {
  name: string;
  description: string;
  releaseDate: Date;
  categoryId: number;
  platformId: number;
  movieTime: string;

  constructor(
    name: string,
    description: string,
    releaseDate: Date,
    categoryId: number,
    platformId: number,
    movieTime: string
  ) {
    this.name = name;
    this.description = description;
    this.releaseDate = releaseDate;
    this.categoryId = categoryId;
    this.platformId = platformId;
    this.movieTime = movieTime;
  }
}
