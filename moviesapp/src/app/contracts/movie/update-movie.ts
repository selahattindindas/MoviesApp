export class Update_Movie{
    id:string;
    name: string;
    categoryId: number;
    platformId: number;
    description:string;
    releaseDate:Date;
    movieTime: string;

constructor(name:string, categoryId:number, platformId:number, director:string, description:string, releaseDate:Date, movieTime:string){
    this.name = name,
    this.categoryId = categoryId,
    this.platformId = platformId,
    this.description = description,
    this.releaseDate = releaseDate,
    this.movieTime = movieTime
}
}