import { Component, OnInit } from '@angular/core';
import { List_Movie } from 'src/app/contracts/movie/list-movie';
import { MoviesService } from 'src/app/services/common/models/movies.service';
import { PhotoComponent } from '../../photo/photo.component';
import { DiyalogService } from 'src/app/services/common/dialog.service';
import { NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { take } from 'rxjs';


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
  selectedMovieId: string = "";
  constructor(private movieService: MoviesService, private diyalogService: DiyalogService) {}

  ngOnInit(): void {
    this.getMovie();
  }
  
  getMovie() {
    return this.movieService.getAllMovies().then(movieData=>{
      this.movie = movieData as List_Movie[];
    })
  }

  photoContents(id: string) {
    this.photoComponent = !this.photoComponent;
    this.selectedMovieId = id;
  }
  
  deleteMovie(id: string) {
    this.movieService.deleteMovie(id).then(() => {
      this.getMovie();
    });
  }

}
