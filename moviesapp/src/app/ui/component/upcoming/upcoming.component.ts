import { Component, OnInit } from '@angular/core';
import { List_Movie } from 'src/app/contracts/movie/list-movie';
import { MoviesService } from 'src/app/services/common/models/movies.service';

@Component({
  selector: 'app-upcoming',
  templateUrl: './upcoming.component.html',
  styleUrls: ['./upcoming.component.css']
})
export class UpcomingComponent implements OnInit {
  movies : List_Movie[];

  constructor(private movieService: MoviesService){}

  ngOnInit(): void {
      this.getMovies();
  }
  async getMovies(){
    this.movies = await this.movieService.getAllMovies() as List_Movie[];

  }
}
