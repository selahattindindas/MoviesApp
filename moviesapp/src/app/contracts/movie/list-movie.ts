export class List_Movie{
    id: number;
    name: string;
    categoryName: string;
    platformName: string;
    players:string;
    directors:string;
    movieTime:string;
    releaseDate: string;
    description:string;

constructor(id:number, name:string, categoryName:string, platformName:string, releaseDate:string, movieTime:string, description:string,directors:string, players:string){
    this.id = id;
    this.name = name,
    this.categoryName = categoryName,
    
    this.platformName = platformName,
    this.releaseDate = releaseDate,
    this.movieTime = movieTime,
    this.players = players,
    this.directors = directors,
    this.description = description
}
}