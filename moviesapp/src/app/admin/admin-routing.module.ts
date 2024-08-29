import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { LayoutModule } from './layout/layout.module';

const route: Route[] = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '', loadChildren: () =>
          import('./component/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'movie-list', loadChildren: () =>
          import('./component/movies/movie.module').then(m => m.MoviesModule)
      },
      {
        path: 'category-and-platform-list', loadChildren: () =>
          import('./component/category-and-platform/category-and-platform.module').then(m => m.CategoryAndPlatformModule)
      },
      {
        path: 'users', loadChildren: () =>
          import('./component/user/user.module').then(m => m.UserModule)
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(route), LayoutModule],
  exports: [RouterModule],
})
export class AdminRoutingModule { }
