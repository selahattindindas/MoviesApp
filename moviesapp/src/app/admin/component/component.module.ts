import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user/user.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AdminlayoutComponent } from './admin-layout/admin-layout.component';
import { UpdateComponent } from './movies/movie-update/movie-update.component';
import { MovieListComponent } from './movies/movie-list/movie-list.component';
import { MovieCreateComponent } from './movies/movie-create/movie-create.component';
import { TextFilterPipe } from 'src/app/shared/pipes/filter-pipe';
import { AdminPlatform } from './platform/platform.component';
import { AdminCategory } from './category/category.component';
import { ClassListComponent } from './class-list/class-list.component';
import { LimitPipe } from 'src/app/shared/pipes/limit-pipe';
import { PhotoComponent } from './photo/photo.component';
import { PlayersComponent } from './players/players.component';
import { DirectorsComponent } from './directors/directors.component';
@NgModule({
  declarations: [
    UserComponent,
    AdminHomeComponent,
    AdminlayoutComponent,
    UpdateComponent,
    MovieListComponent,
    MovieCreateComponent,
    TextFilterPipe,
    AdminPlatform,
    AdminCategory,
    ClassListComponent,
    LimitPipe,
    PhotoComponent,
    PlayersComponent,
    DirectorsComponent,
    
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [AdminlayoutComponent],
})
export class AdminModule { }
