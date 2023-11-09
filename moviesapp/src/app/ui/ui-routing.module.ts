import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './component/index/index.component';
import { VisionMoviesComponent } from './component/vision-movies/vision-movies.component';
import { NewsListComponent } from './component/news-list/news-list.component';
import { PlatformMoviesComponent } from './component/platform-movies/platform-movies.component';
import { UpcomingComponent } from './component/upcoming/upcoming.component';
import { VisionDetailsComponent } from './component/vision-details/vision-details.component';
import { LoginComponent } from './component/login/login.component';
import { UiLayoutComponentComponent } from './component/ui-layout-component/ui-layout-component.component';
const routes: Route[] = [
  {
    path: '',
    redirectTo: 'Filmler',
    pathMatch: 'full'
  },
  {
    path: 'Filmler',
    component: UiLayoutComponentComponent,
    children: [
      { path: '', component: IndexComponent },
      { path: 'Vizyondakiler', component: VisionMoviesComponent },
      { path: 'Platformdakiler', component: PlatformMoviesComponent },
      { path: 'Yaklasanlar', component: UpcomingComponent },
      { path: 'Haberler', component: NewsListComponent },
      { path: 'Detay/:id', component: VisionDetailsComponent },
      { path: 'Giriş', component: LoginComponent },
    ],
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UiRoutingModule {}
