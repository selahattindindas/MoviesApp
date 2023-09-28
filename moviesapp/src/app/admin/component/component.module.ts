import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user/user.component';
import { AdminhomeComponent } from './adminhome/adminhome.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AdminlayoutComponent } from './adminlayout/adminlayout.component';
import { AdminNewListComponent } from './admin-new-list/admin-new-list.component';
import { UpdateComponent } from './movies/update/update.component';
import { MovieListComponent } from './movies/movie-list/movie-list.component';
import { MovieCreateComponent } from './movies/create/create.component';
import { TextFilterPipe } from 'src/app/shared/filter.pipe';

@NgModule({
  declarations: [
    UserComponent,
    AdminhomeComponent,
    AdminlayoutComponent,
    AdminNewListComponent,
    UpdateComponent,
    MovieListComponent,
    MovieCreateComponent,
    TextFilterPipe,
  ],
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule ],
  providers: [AdminlayoutComponent],
})
export class AdminModule {}
