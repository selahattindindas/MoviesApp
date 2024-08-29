import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MovieCreateComponent } from './movie-create.component';
import { FormMovieModule } from 'src/app/shared/components/form-movie/form-movie.module';

@NgModule({
    declarations:[
        MovieCreateComponent
    ],
    imports: [
        CommonModule,
        NgxSpinnerModule,
        FormMovieModule
    ],
    exports: [
    ]
})

export class MovieCreateModule { }
