import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MovieListComponent } from './movie-list.component';
import { PipeModule } from 'src/app/shared/pipes/pipe-module';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations:[
        MovieListComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        PipeModule,
        FormsModule,
        RouterModule
    ],
    exports: [
    ]
})

export class MovieListModule { }
