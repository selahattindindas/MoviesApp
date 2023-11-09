import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from './banner/banner.component';
import { CategoryComponent } from './category/category.component';
import { SearchComponent } from './search/search.component';
import { PlatformMoviesComponent } from './platform-movies/platform-movies.component';
import { VisionMoviesComponent } from './vision-movies/vision-movies.component';
import { NewsListComponent } from './news-list/news-list.component';
import { IndexComponent } from './index/index.component';
import { PopularPlatformComponent } from './popular-platform/popular-platform.component';
import { PopularMoviesComponent } from './popular-movies/popular-movies.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UpcomingComponent } from './upcoming/upcoming.component';
import { VisionDetailsComponent } from './vision-details/vision-details.component';
import { UiLayoutComponentComponent } from './ui-layout-component/ui-layout-component.component';
import { NavbarComponent } from './ui-templates/navbar/navbar.component';
import { FooterComponent } from './ui-templates/footer/footer.component';
import { SharedModule } from 'src/app/shared/pipes/pipe-module';



@NgModule({
  declarations: [
    BannerComponent,
    CategoryComponent,
    SearchComponent,
    PlatformMoviesComponent,
    VisionMoviesComponent,
    NewsListComponent,
    IndexComponent,
    PopularPlatformComponent,
    PopularMoviesComponent,
    UpcomingComponent,
    VisionDetailsComponent,
    UiLayoutComponentComponent,
    NavbarComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    SharedModule
  ],
  providers:[
    UiLayoutComponentComponent
  ]
})
export class UiModule {}
