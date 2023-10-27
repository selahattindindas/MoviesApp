import { Component, OnInit } from '@angular/core';
import { List_Movie } from 'src/app/contracts/movie/list-movie';
import { MoviesService } from 'src/app/services/common/models/movies.service';


@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
})
export class MovieListComponent implements OnInit {
  movie: List_Movie[];
  filterText: string;
  filterName: keyof List_Movie = 'name';
  photoComponent: boolean = false;
  selectedMovieId: number;
  constructor(private movieService: MoviesService) {}

  ngOnInit(): void {
    this.getMovie();
  }

  getMovie() {
    return this.movieService.getAllMovies().then(movieData=>{
      this.movie = movieData as List_Movie[];
    })
  }

  photoContents(id: number) {
    this.photoComponent = !this.photoComponent;
    this.selectedMovieId = id;
  }
  
  deleteMovie(id: number) {
    this.movieService.deleteMovie(id).then(() => {
      this.getMovie();
    });
  }

}
