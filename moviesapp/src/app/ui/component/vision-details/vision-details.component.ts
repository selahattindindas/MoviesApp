import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { List_Movie } from 'src/app/contracts/movie/list-movie';
import { MoviesService } from 'src/app/services/common/models/movies.service';

@Component({
  selector: 'app-vision-details',
  templateUrl: './vision-details.component.html',
  styleUrls: ['./vision-details.component.css']
})
export class VisionDetailsComponent implements OnInit{
  movies: List_Movie;
  movieId: number;
  constructor(private movieService:MoviesService, private route:ActivatedRoute){}
  ngOnInit(): void {
    this.getMovieById();
  }
  getMovieById(){
    const params = this.route.snapshot.params;
    this.movieService.getMovieById(params['id']).then((movieData: Partial<List_Movie | string>) => {
      if (movieData) {
        this.movies = movieData as List_Movie;
        this.movieId = params['id'];
      }
    });
  }
}
