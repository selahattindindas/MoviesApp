import { Component, OnInit } from '@angular/core';
import { List_Movie } from 'src/app/contracts/movie/list-movie';
import { MoviesService } from 'src/app/services/common/models/movies.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
})
export class MovieListComponent implements OnInit {
  constructor(private movieService: MoviesService) {}
  movie: List_Movie[];
  filterText: string;
  filterName: keyof List_Movie = 'movieName';
  ngOnInit(): void {
    this.getMovie();
  }
  deleteMovie(id: string) {
    this.movieService.delete(id).then(() => {
      this.getMovie();
    });
  }
  async getMovie() {
    const movieData: Partial<List_Movie[]> = await this.movieService.get();
    this.movie = movieData as List_Movie[];
  }
}
