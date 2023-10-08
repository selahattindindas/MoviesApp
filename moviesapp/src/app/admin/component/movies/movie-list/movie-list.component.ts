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
  filterName: keyof List_Movie = 'name';
  imageUrl: string | ArrayBuffer | null = null;
  ngOnInit(): void {
    this.getMovie();
  }
  deleteMovie(id: string) {
    this.movieService.deleteMovie(id).then(() => {
      this.getMovie();
    });
  }
  async getMovie() {
    return this.movieService.getAllMovies().then(movieData=>{
      this.movie = movieData as List_Movie[];
    })
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }
}
