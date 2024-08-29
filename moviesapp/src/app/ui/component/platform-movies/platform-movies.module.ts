import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { NgxSpinnerModule } from "ngx-spinner";
import { PlatformMoviesComponent } from "./platform-movies.component";
import { PipeModule } from "src/app/shared/pipes/pipe-module";
import { SliderModule } from "src/app/shared/components/slider/slider.module";

@NgModule({
    declarations: [
        PlatformMoviesComponent,
    ],
    imports:[
        CommonModule,
        RouterModule.forChild([
            {path: '', component: PlatformMoviesComponent}
        ]),
        PipeModule,
        SliderModule
    ],
    exports:[]
})
export class PlatformMovieModule{}