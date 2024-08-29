import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';
import { DateEnum } from 'src/app/constacts/date-enum';
import { PlatformEnum } from 'src/app/constacts/platform-enum';
import { SpinnerType } from 'src/app/constacts/spinner-enum';
import { List_Movie } from 'src/app/contracts/movie/list-movie';
import { MoviesService } from 'src/app/services/common/models/movies.service';

@Component({
  selector: 'app-popular-movies',
  templateUrl: './popular-movies.component.html',
  styleUrls: ['./popular-movies.component.css']
})
export class PopularMoviesComponent extends BaseComponent implements OnInit{
  platforms: { 
    name: string; 
    enumValues: PlatformEnum[]; 
    movies: List_Movie[] 
  }[] = [
    { name: 'Popüler Sinema Filmleri', enumValues: [PlatformEnum.Sinema], movies: [] },
    { name: 'Popüler Platform Filmleri', enumValues: [PlatformEnum.Disney, PlatformEnum.Netflix], movies: [] }
  ];

  constructor(private movieService: MoviesService, spinner: NgxSpinnerService){
    super(spinner);
  }

  ngOnInit(): void {
    this.getMovies();  
  }

  async getMovies() {
    this.componentSpinner(SpinnerType.JellyBox);

    for (let platform of this.platforms) {
      let allMovies: List_Movie[] = [];
  
      for (let enumValue of platform.enumValues) {
        const movies = await this.movieService.getAllMovies(enumValue, DateEnum.Vision) as List_Movie[];
        allMovies = [...allMovies, ...movies];
      }

      for (let i = allMovies.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [allMovies[i], allMovies[j]] = [allMovies[j], allMovies[i]];
      }

      platform.movies = allMovies.slice(0, 4);
    }

    this.spinner.hide();
  }
}
