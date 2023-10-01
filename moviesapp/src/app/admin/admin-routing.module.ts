import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { AdminhomeComponent } from './component/admin-home/admin-home.component';
import { AdminlayoutComponent } from './component/admin-layout/admin-layout.component';
import { MovieCreateComponent } from './component/movies/movie-create/movie-create.component';
import { MovieListComponent } from './component/movies/movie-list/movie-list.component';
import { UpdateComponent } from './component/movies/movie-update/movie-update.component';
import { UserComponent } from './component/user/user.component';
import { PlatformListComponent } from './component/platform/platform-list/platform-list.component';
const route: Route[] = [
  {
    path: 'Admin',
    component: AdminlayoutComponent,
    children: [
      { path: '', component: AdminhomeComponent },
      {
        path: 'Movies-List',
        children: [
          { path: 'Edit/:id', component: UpdateComponent },
          { path: 'Create-Movie', component: MovieCreateComponent },
          { path: '', component: MovieListComponent },
        ],
      },
      { path: 'Platforms', component: PlatformListComponent },
      { path: 'Users', component: UserComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(route)],
  exports: [RouterModule],
})
export class AdminRouting {}
