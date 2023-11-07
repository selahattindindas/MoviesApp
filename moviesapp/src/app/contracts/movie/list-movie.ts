import { List_Photo } from "../photo/list-photo";

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
    movieImages: List_Photo[];
}