export class Update_Movie{
    id: number;
    name: string;
    categoryId: number;
    platformId: number;
    description:string;
    releaseDate:Date;
    movieTime: string;

constructor(id:number, name:string, categoryId:number, platformId:number, description:string, releaseDate:Date, movieTime:string){
    this.id = id,
    this.name = name,
    this.categoryId = categoryId,
    this.platformId = platformId,
    this.description = description,
    this.releaseDate = releaseDate,
    this.movieTime = movieTime
}
}