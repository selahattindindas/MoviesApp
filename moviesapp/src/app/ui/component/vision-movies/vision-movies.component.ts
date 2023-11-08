import { Component, OnInit } from '@angular/core';
import { List_Movie } from 'src/app/contracts/movie/list-movie';
import { List_Photo } from 'src/app/contracts/photo/list-photo';
import { MoviesService } from 'src/app/services/common/models/movies.service';
import { environment } from 'src/app/environments/environment';
@Component({
  selector: 'app-vision-movies',
  templateUrl: './vision-movies.component.html',
  styleUrls: ['./vision-movies.component.css'],
})
export class VisionMoviesComponent implements OnInit {
  movie: List_Movie[];
  constructor(private movieService: MoviesService) {}
  getPhoto: List_Photo[];
  ngOnInit(): void {
    this.getMovie();
  }
  photo:List_Photo[];
  async getMovie() {
    const movieData = await this.movieService.getAllMovies();
    this.movie = movieData as List_Movie[];
  }
  getDirectorNames(photo: List_Photo[]) {
    return photo.forEach(image =>{
      image.photos.forEach(content =>{
        content.path = environment.photoUrl + content.path;
      });
    });
  }
}
