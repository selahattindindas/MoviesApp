import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieUpdateComponent } from './movie-update.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormMovieModule } from 'src/app/shared/components/form-movie/form-movie.module';

@NgModule({
    declarations:[
        MovieUpdateComponent
    ],
    imports: [
        CommonModule,
        NgxSpinnerModule,
        FormMovieModule
    ],
    exports: [
    ]
})

export class MovieUpdateModule { }
