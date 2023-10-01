export class Update_Movie{
    name: string;
    categoryId: number;
    platformId: number;
    description:string;
    director:string;
    releaseDate:Date;
    movieTime: Date;

constructor(name:string, categoryId:number, platformId:number, director:string, description:string, releaseDate:Date, movieTime:Date){
    this.name = name,
    this.categoryId = categoryId,
    this.platformId = platformId,
    this.director = director,
    this.description = description,
    this.releaseDate = releaseDate,
    this.movieTime = movieTime
}
}