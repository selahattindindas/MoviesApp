import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { UserComponent } from './user/user.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AdminlayoutComponent } from './admin-layout/admin-layout.component';
import { UpdateComponent } from './movies/movie-update/movie-update.component';
import { MovieListComponent } from './movies/movie-list/movie-list.component';
import { MovieCreateComponent } from './movies/movie-create/movie-create.component';
import { AdminPlatform } from './platform/platform.component';
import { AdminCategory } from './category/category.component';
import { ClassListComponent } from './class-list/class-list.component';
import { PhotoComponent } from './photo/photo.component';
import { PlayersComponent } from './players/players.component';
import { DirectorsComponent } from './directors/directors.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './admin-templates/navbar/navbar.component';
import { FooterComponent } from './admin-templates/footer/footer.component';
import { SidebarComponent } from './admin-templates/sidebar/sidebar.component';
import { SharedModule } from 'src/app/shared/pipes/pipe-module';

@NgModule({
  declarations: [
    UserComponent,
    AdminHomeComponent,
    AdminlayoutComponent,
    UpdateComponent,
    MovieListComponent,
    MovieCreateComponent,
    AdminPlatform,
    AdminCategory,
    ClassListComponent,
    PhotoComponent,
    PlayersComponent,
    DirectorsComponent,
    NavbarComponent,
    FooterComponent,
    SidebarComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    SharedModule,
  ],
  providers: [AdminlayoutComponent, DatePipe],
})
export class AdminModule { }
