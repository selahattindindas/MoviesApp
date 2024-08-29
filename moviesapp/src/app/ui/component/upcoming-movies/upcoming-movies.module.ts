import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { CategoryModule } from "src/app/shared/components/category/category.module";
import { UpcomingMoviesComponent } from "./upcoming-movies.component";
import { PipeModule } from "src/app/shared/pipes/pipe-module";
import { CardModule } from "src/app/shared/components/card/card.module";
import { SearchModule } from "src/app/shared/components/search/search.module";

@NgModule({
    declarations: [
        UpcomingMoviesComponent,
    ],
    imports:[
        CommonModule,
        RouterModule.forChild([
            {path: '', component: UpcomingMoviesComponent}
        ]),
        CategoryModule,
        PipeModule,
        CardModule,
        SearchModule
    ],
    exports:[]
})
export class UpComingMovieModule{}