import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { LayoutModule } from './layout/layout.module';

const routes: Route[] = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '', loadChildren: () =>
                    import('./component/home/home.module').then(m => m.HomeModule)
            },
            {
                path: 'vizyondakiler', loadChildren: () =>
                    import('./component/cinema-movies/cinema-movies.module').then(m => m.CinemaMovieModule)
            },
            {
                path: 'platformdakiler', loadChildren: () =>
                    import('./component/platform-movies/platform-movies.module').then(m => m.PlatformMovieModule)
            },
            {
                path: 'yaklasanlar', loadChildren: () =>
                    import('./component/upcoming-movies/upcoming-movies.module').then(m => m.UpComingMovieModule)
            },
            {
                path: 'haberler', loadChildren: () =>
                    import('./component/news-list/news-list.module').then(m => m.NewListModule)
            },
            {
                path: 'hakkımızda', loadChildren: () =>
                    import('./component/about/about.module').then(m => m.AboutModule)
            },
            {
                path: 'detay/:id', loadChildren: () =>
                    import('./component/movie-details/movie-details.module').then(m => m.MovieDetailModule)
            },
            {
                path: 'giris', loadChildren: () =>
                    import('./component/login/login.module').then(m => m.LoginModule)
            },
        ],
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes), LayoutModule],
    exports: [RouterModule],
})
export class UiRoutingModule { }
