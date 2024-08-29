import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PopularMoviesComponent } from "./popular-movies.component";
import { CardModule } from "src/app/shared/components/card/card.module";

@NgModule({
    declarations: [
        PopularMoviesComponent
    ],
    imports:[
        CommonModule,
        CardModule
    ],
    exports:[
        PopularMoviesComponent
    ]
})
export class PopularMovieModule{}