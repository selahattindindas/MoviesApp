import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user/user.component';
import { AdminhomeComponent } from './admin-home/admin-home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AdminlayoutComponent } from './admin-layout/admin-layout.component';
import { UpdateComponent } from './movies/movie-update/movie-update.component';
import { MovieListComponent } from './movies/movie-list/movie-list.component';
import { MovieCreateComponent } from './movies/movie-create/movie-create.component';
import { TextFilterPipe } from 'src/app/shared/filter-pipe';
import { CreateComponent } from './platform/create/create.component';
import { PlatformListComponent } from './platform/platform-list/platform-list.component';
import { PlatformUpdateComponent } from './platform/platform-update/platform-update.component';
import { CategoryCreateComponent } from './category/category-create/category-create.component';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { CategoryUpdateComponent } from './category/category-update/category-update.component';

@NgModule({
  declarations: [
    UserComponent,
    AdminhomeComponent,
    AdminlayoutComponent,
    UpdateComponent,
    MovieListComponent,
    MovieCreateComponent,
    TextFilterPipe,
    CreateComponent,
    PlatformListComponent,
    PlatformUpdateComponent,
    CategoryCreateComponent,
    CategoryListComponent,
    CategoryUpdateComponent,
  ],
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  providers: [AdminlayoutComponent],
})
export class AdminModule {}
