import { Component, OnInit } from '@angular/core';
import { List_Movie } from 'src/app/contracts/movie/list_movie';
import { Actor, Director } from 'src/app/entities/movie';
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
    this.getMovie();
  }

  async getMovie() {
    const movieData: Partial<List_Movie[]> = await this.movieService.get();
      this.movie = movieData as List_Movie[];
}
  formatDirectors(directors: Director[]): string {
    const directorNames: string[] = directors.map((director) => director.name);
    return directorNames.join(', ');
  }
  
  formatActors(actors: Actor[]): string {
    const actorNames: string[] = actors.map((actor) => actor.name);
    return actorNames.join(', ');
  }
}
