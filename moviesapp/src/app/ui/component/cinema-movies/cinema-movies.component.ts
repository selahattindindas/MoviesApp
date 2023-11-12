import { Component, OnInit } from '@angular/core';
import { List_Movie } from 'src/app/contracts/movie/list-movie';
import { MoviesService } from 'src/app/services/common/models/movies.service';
import { CategoryEnum } from 'src/app/enums/category-enum';
import { PlatformEnum } from 'src/app/enums/platform-enum';

@Component({
  selector: 'app-cinema-movies',
  templateUrl: './cinema-movies.component.html',
  styleUrls: ['./cinema-movies.component.css']
})
export class CinemaMoviesComponent implements OnInit {
  movie: List_Movie[];
  filterText: string;
  filterName: keyof List_Movie = 'name';
  platformEnum: PlatformEnum;
  constructor(private movieService: MoviesService) { }

  ngOnInit(): void {
    this.getMovies();
  }

  async getMovies() {
    this.movie = await this.movieService.getAllMovies(PlatformEnum.Sinema) as List_Movie[];
  }

  async onCategorySelected(category: CategoryEnum) {
    const categoryValue = category as unknown;

    if (categoryValue === CategoryEnum.Seciniz.toString())
      this.getMovies();

    else {

      const categoryName = CategoryEnum[category];

      const movieData = await this.movieService.getAllMovies(PlatformEnum.Sinema);
      if (Array.isArray(movieData)) {
        this.movie = movieData.filter(movie => {
          return movie.categoryName === categoryName;
        });
      }
    }
  }
}
