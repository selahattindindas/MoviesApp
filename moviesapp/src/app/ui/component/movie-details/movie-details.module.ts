import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { NgxSpinnerModule } from "ngx-spinner";
import { MovieDetailsComponent } from "./movie-details.component";
import { PipeModule } from "src/app/shared/pipes/pipe-module";

@NgModule({
    declarations: [
        MovieDetailsComponent,
    ],
    imports:[
        CommonModule,
        RouterModule.forChild([
            {path: '', component: MovieDetailsComponent}
        ]),
        PipeModule
    ],
    exports:[]
})
export class MovieDetailModule{}