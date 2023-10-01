export class List_Movie{
    id: string;
    movieName: string;
    categoryName: string;
    platformName: string;
    director: string;
    movieTime:Date;
    releaseDate: Date;
    description:string;

constructor(id:string, movieName:string, categoryName:string, platformName:string, releaseDate:Date,director:string, movieTime:Date, description:string){
    this.id = id;
    this.movieName = movieName,
    this.categoryName = categoryName,
    this.platformName = platformName,
    this.releaseDate = releaseDate,
    this.director = director,
    this.movieTime = movieTime,
    this.description = description
}
}