import { NgModule } from "@angular/core";
import { CinemaMoviesComponent } from "./cinema-movies.component";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { NgxSpinnerModule } from "ngx-spinner";
import { FormsModule } from "@angular/forms";
import { CategoryModule } from "src/app/shared/components/category/category.module";
import { PipeModule } from "src/app/shared/pipes/pipe-module";
import { CardModule } from "src/app/shared/components/card/card.module";
import { SearchModule } from "src/app/shared/components/search/search.module";

@NgModule({
    declarations: [
        CinemaMoviesComponent,

    ],
    imports:[
        CommonModule,
        RouterModule.forChild([
            {path: '', component: CinemaMoviesComponent}
        ]),
        CategoryModule,
        PipeModule,
        CardModule,
        SearchModule
    ],
    exports:[]
})
export class CinemaMovieModule{}