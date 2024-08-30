import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { LayoutModule } from './layout/layout.module';
import { AuthGuard } from '../guards/common/auth.guard';
import { LoginGuard } from '../guards/common/login.guard';

const route: Route[] = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
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
  },
  {
    path: 'login', loadChildren: () =>
      import('./component/login/login.module').then(m => m.LoginModule),
    canActivate: [LoginGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(route), LayoutModule],
  exports: [RouterModule],
})
export class AdminRoutingModule { }
