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
import { TextFilterPipe } from 'src/app/shared/filter-pipe';
import { AdminPlatform } from './platform/platform.component';
import { AdminCategory } from './category/category.component';
import { ClassListComponent } from './class-list/class-list.component';
import { DirectorCreateComponent } from './director/director-create/director-create.component';
import { DirectorUpdateComponent } from './director/director-update/director-update.component';
import { CreatePlayersComponent } from './players/create-players/create-players.component';
import { UpdatePlayersComponent } from './players/update-players/update-players.component';
import { LimitPipe } from 'src/app/shared/limit-pipe';
import { PhotoComponent } from './photo/photo.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

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
    DirectorCreateComponent,
    DirectorUpdateComponent,
    CreatePlayersComponent,
    UpdatePlayersComponent,
    LimitPipe,
    PhotoComponent,
  ],
  imports: [
    CommonModule, 
    RouterModule, 
    FormsModule, 
    ReactiveFormsModule, 
    MatCardModule,
    MatButtonModule,
    MatInputModule
  ],
  providers: [AdminlayoutComponent],
})
export class AdminModule {}
