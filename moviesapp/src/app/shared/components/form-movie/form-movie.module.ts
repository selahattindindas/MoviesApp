import { NgModule } from "@angular/core";
import { FormMovieComponent } from "./form-movie.component";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

@NgModule({
    declarations:[
        FormMovieComponent
    ],
    imports:[
        CommonModule,
        ReactiveFormsModule,
        RouterModule
    ],
    exports:[
        FormMovieComponent
    ]
})

export class FormMovieModule{}