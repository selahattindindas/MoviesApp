import { Component, OnInit } from '@angular/core';
import { List_Movie } from 'src/app/contracts/movie/list-movie';
import { MoviesService } from 'src/app/services/common/models/movies.service';
import { CategoryEnum } from 'src/app/enums/category-enum';
import { ListPlatformEnum, PlatformEnum } from 'src/app/enums/platform-enum';

@Component({
  selector: 'app-vision-movies',
  templateUrl: './vision-movies.component.html',
  styleUrls: ['./vision-movies.component.css'],
})

export class VisionMoviesComponent implements OnInit {
  originalMovieData: List_Movie[];
  movie: List_Movie[];
  filterText: string;
  filterName: keyof List_Movie = 'name';
  selectedCategory: CategoryEnum;
  constructor(private movieService: MoviesService) {
  }

  ngOnInit(): void {
    this.getMovie();
  }

  async getMovie() {
    const movieData = await this.movieService.getAllMovies();
    this.movie = movieData as List_Movie[];
  }

  onCategorySelected(category: CategoryEnum) {
    this.selectedCategory = category;

    if (this.selectedCategory === CategoryEnum.Seciniz) {

      this.movie = [...this.originalMovieData];
    } else {

      this.movie = this.movie.filter(movie => movie.categoryName === this.selectedCategory.toString());
    }
  }
}
