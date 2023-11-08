import { List_Director } from "../director/list-director";
import { List_Photo, Photo } from "../photo/list-photo";
import { List_Player } from "../player/list-player";

export class List_Movie{
    id: number;
    name: string;
    categoryName: string;
    platformName: string;
    players:List_Player[];
    directors:List_Director[];
    movieTime:number;
    releaseDate: string;
    description:string;
    movieImages: Photo[];
}