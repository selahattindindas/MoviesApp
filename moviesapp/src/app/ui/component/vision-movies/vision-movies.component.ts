import { Component, OnInit } from '@angular/core';
import { List_Movie } from 'src/app/contracts/movie/list-movie';
import { List_Photo } from 'src/app/contracts/photo/list-photo';
import { MoviesService } from 'src/app/services/common/models/movies.service';

@Component({
  selector: 'app-vision-movies',
  templateUrl: './vision-movies.component.html',
  styleUrls: ['./vision-movies.component.css'],
})
export class VisionMoviesComponent implements OnInit {
  movie: List_Movie[] = [];
  getPhoto: List_Photo[] = [];
  constructor(private movieService: MoviesService) {}

  ngOnInit(): void {
    this.getMovie();
  }
  async getMovie() {
    const movieData = await this.movieService.getAllMovies();
    this.movie = movieData as List_Movie[];
  }
}
