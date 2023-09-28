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
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  providers:[
    UiLayoutComponentComponent
  ]
})
export class UiModule {}
