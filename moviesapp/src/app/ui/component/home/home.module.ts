import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { HomeComponent } from "./home.component";
import { BannerModule } from "./banner/banner.module";
import { PopularMovieModule } from "./popular-movies/popular-movies.module";

@NgModule({
    declarations: [
        HomeComponent,
    ],
    imports:[
        CommonModule,
        RouterModule.forChild([
            {path: '', component: HomeComponent}
        ]),
        BannerModule,
        PopularMovieModule
    ],
    exports:[]
})
export class HomeModule{}