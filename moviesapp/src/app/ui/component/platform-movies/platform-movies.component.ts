import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';
import { DateEnum } from 'src/app/constacts/date-enum';
import { PlatformEnum } from 'src/app/constacts/platform-enum';
import { SpinnerType } from 'src/app/constacts/spinner-enum';
import { List_Movie } from 'src/app/contracts/movie/list-movie';
import { MoviesService } from 'src/app/services/common/models/movies.service';

@Component({
  selector: 'app-platform-movies',
  templateUrl: './platform-movies.component.html',
  styleUrls: ['./platform-movies.component.css']
})
export class PlatformMoviesComponent extends BaseComponent implements OnInit {
  platforms: { 
    name: string; 
    logo: string; 
    enumValue: PlatformEnum; 
    movies: List_Movie[] 
  }[] = [
    { name: 'Netflix', logo: 'assets/img/ui/platform/netflix.jpg', enumValue: PlatformEnum.Netflix, movies: [] },
    { name: 'Disney', logo: 'assets/img/ui/platform/disney.jpg', enumValue: PlatformEnum.Disney, movies: [] }
  ];

  constructor(spinner:NgxSpinnerService, private movieService: MoviesService){
    super(spinner);
  }
  ngOnInit(): void {
      this.componentSpinner(SpinnerType.JellyBox);
      this.loadMovies();
  }

  async loadMovies() {
    this.componentSpinner(SpinnerType.JellyBox); 
    for (let platform of this.platforms) { 
      this.movieService.getAllMovies(platform.enumValue, DateEnum.Vision)
        .then(movieData => {
          platform.movies  = movieData as List_Movie[];
        })
        .finally(() => {
          this.spinner.hide(); 
        });
    }
  }
}
