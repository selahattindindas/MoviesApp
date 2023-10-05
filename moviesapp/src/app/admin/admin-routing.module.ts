import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './component/admin-home/admin-home.component';
import { AdminlayoutComponent } from './component/admin-layout/admin-layout.component';
import { MovieCreateComponent } from './component/movies/movie-create/movie-create.component';
import { MovieListComponent } from './component/movies/movie-list/movie-list.component';
import { UpdateComponent } from './component/movies/movie-update/movie-update.component';
import { UserComponent } from './component/user/user.component';
import { PlatformUpdateComponent } from './component/platform/platform-update/platform-update.component';
import { PlatformCreateComponent } from './component/platform/platform-create/platform-create.component';
import { CategoryUpdateComponent } from './component/category/category-update/category-update.component';
import { ClassListComponent } from './component/class-list/class-list.component';
import { DirectorCreateComponent } from './component/director/director-create/director-create.component';
import { CreatePlayersComponent } from './component/players/create-players/create-players.component';
const route: Route[] = [
  {
    path: 'Admin',
    component: AdminlayoutComponent,
    children: [
      { path: '', component: AdminHomeComponent },
      {
        path: 'Movies-List',
        children: [
          { path: 'Edit/:id', component: UpdateComponent },
          { path: 'Create-Movie', component: MovieCreateComponent },
          { path: '', component: MovieListComponent },
          { path: 'Create-Director/:id', component: DirectorCreateComponent},
          { path: 'Create-Players/:id', component: CreatePlayersComponent}
        ],
      },
      {
        path: 'Class-List',
        children: [
          { path: 'Category-Edit/:id', component: CategoryUpdateComponent},
          { path: 'Platform-Edit/:id', component: PlatformUpdateComponent },
          { path: 'Create-Platform', component: PlatformCreateComponent },
          { path: '', component: ClassListComponent },
        ],
      },
      { path: 'Users', component: UserComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(route)],
  exports: [RouterModule],
})
export class AdminRouting {}
