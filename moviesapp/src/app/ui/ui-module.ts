import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/pipes/pipe-module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { UiLayoutComponent } from './component/ui-layout/ui-layout.component';
import { HomeComponent } from './component/home/home.component';
import { CinemaMoviesComponent } from './component/cinema-movies/cinema-movies.component';
import { CategoryComponent } from './component/category/category.component';
import { PopularCinemaComponent } from './component/home/popular-cinema/popular-cinema.component';
import { PopularPlatformComponent } from './component/home/popular-platform/popular-platform.component';
import { PlatformMoviesComponent } from './component/platform-movies/platform-movies.component';
import { NewsListComponent } from './component/news-list/news-list.component';
import { NetflixComponent } from './component/platform-movies/netflix/netflix.component';
import { BannerComponent } from './component/home/banner/banner.component';
import { LoginComponent } from './component/login/login.component';
import { MovieDetailsComponent } from './component/movie-details/movie-details.component';
import { FooterComponent } from './component/ui-templates/footer/footer.component';
import { NavbarComponent } from './component/ui-templates/navbar/navbar.component';
import { UpcomingMoviesComponent } from './component/upcoming-movies/upcoming-movies.component';
import { DisneyComponent } from './component/platform-movies/disney/disney.component';
import { SidebarComponent } from './component/ui-templates/sidebar/sidebar.component';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
    declarations: [
        UiLayoutComponent,
        HomeComponent,
        BannerComponent,
        PopularCinemaComponent,
        PopularPlatformComponent,
        CinemaMoviesComponent,
        CategoryComponent,
        PlatformMoviesComponent,
        NetflixComponent,
        DisneyComponent,
        UpcomingMoviesComponent,
        NewsListComponent,
        LoginComponent,
        MovieDetailsComponent,
        FooterComponent,
        NavbarComponent,
        SidebarComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        SharedModule,
        BrowserAnimationsModule,
        BrowserModule,
        NgxSpinnerModule
    ],
    providers: [
        UiLayoutComponent
    ]
})
export class UiModules { }
