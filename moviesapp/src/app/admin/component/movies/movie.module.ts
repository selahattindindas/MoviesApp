import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MovieUpdateComponent } from './movie-update/movie-update.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieCreateComponent } from './movie-create/movie-create.component';
import { MovieListModule } from './movie-list/movie-list.module';
import { MovieUpdateModule } from './movie-update/movie-update.module';
import { MovieCreateModule } from './movie-create/movie.create.module';

@NgModule({

  imports: [
    CommonModule,
    RouterModule.forChild([
        {path: '', component: MovieListComponent},
        {path: 'create', component: MovieCreateComponent},
        {path: 'edit/:id', component: MovieUpdateComponent}
    ]),
    MovieListModule,
    MovieUpdateModule,
    MovieCreateModule
  ],
})
export class MoviesModule { }
