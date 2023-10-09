import { Component, OnInit } from '@angular/core';
import { List_Movie } from 'src/app/contracts/movie/list-movie';
import { MoviesService } from 'src/app/services/common/models/movies.service';

@Component({
  selector: 'app-vision-movies',
  templateUrl: './vision-movies.component.html',
  styleUrls: ['./vision-movies.component.css'],
})
export class VisionMoviesComponent implements OnInit {
  movie: List_Movie[] = [];

  constructor(private movieService: MoviesService) {}

  ngOnInit(): void {

  }
}
