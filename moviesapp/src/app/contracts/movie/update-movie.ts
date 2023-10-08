export class Update_Movie{

    name: string;
    categoryId: number;
    platformId: number;
    description:string;
    releaseDate:string;
    movieTime: string;

constructor(name:string, categoryId:number, platformId:number, description:string, releaseDate:string, movieTime:string){

    this.name = name,
    this.categoryId = categoryId,
    this.platformId = platformId,
    this.description = description,
    this.releaseDate = releaseDate,
    this.movieTime = movieTime
}
}