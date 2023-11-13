import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { UiLayoutComponent } from './component/ui-layout/ui-layout.component';
import { HomeComponent } from './component/home/home.component';
import { CinemaMoviesComponent } from './component/cinema-movies/cinema-movies.component';
import { PlatformMoviesComponent } from './component/platform-movies/platform-movies.component';
import { UpcomingMoviesComponent } from './component/upcoming-movies/upcoming-movies.component';
import { NewsListComponent } from './component/news-list/news-list.component';
import { MovieDetailsComponent } from './component/movie-details/movie-details.component';
import { LoginComponent } from './component/login/login.component';
import { NetflixComponent } from './component/platform-movies/netflix/netflix.component';
import { FooterComponent } from './component/ui-templates/footer/footer.component';
import { NavbarComponent } from './component/ui-templates/navbar/navbar.component';
import { SidebarComponent } from './component/ui-templates/sidebar/sidebar.component';

const routes: Route[] = [
    {
        path: '',
        redirectTo: 'Filmler',
        pathMatch: 'full'
    },
    {
        path: 'Filmler',
        component: UiLayoutComponent,
        children: [
            { path: '', component: HomeComponent },
            { path: 'Vizyondakiler', component: CinemaMoviesComponent },
            { path: 'Platformdakiler', component: PlatformMoviesComponent },
            { path: 'Yaklasanlar', component: UpcomingMoviesComponent },
            { path: 'Haberler', component: NewsListComponent },
            { path: 'Detay/:id', component: MovieDetailsComponent },
            { path: 'Giriş', component: LoginComponent },
        ],
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class UiRoutingModule { }
