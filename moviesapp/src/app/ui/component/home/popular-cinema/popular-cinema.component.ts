import { Component, OnInit } from '@angular/core';
import { List_Movie } from 'src/app/contracts/movie/list-movie';
import { DateEnum } from 'src/app/enums/date-enum';
import { PlatformEnum } from 'src/app/enums/platform-enum';
import { MoviesService } from 'src/app/services/common/models/movies.service';

@Component({
  selector: 'popular-cinema',
  templateUrl: './popular-cinema.component.html',
  styleUrls: ['./popular-cinema.component.css']
})
export class PopularCinemaComponent implements OnInit{
  movies: List_Movie[];
  constructor(private movieService: MoviesService){}
  ngOnInit(): void {
    this.getMovies();
  }

  async getMovies() {
    const allMovies = await this.movieService.getAllMovies(PlatformEnum.Sinema, DateEnum.Vizyonda) as List_Movie[];

      for (let i = allMovies.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [allMovies[i], allMovies[j]] = [allMovies[j], allMovies[i]];
      }
      this.movies = allMovies.slice(0,4);
  }
  
}
