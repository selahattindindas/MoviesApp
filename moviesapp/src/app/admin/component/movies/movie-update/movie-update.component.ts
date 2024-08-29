import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';
import { List_Movie } from 'src/app/contracts/movie/list-movie';
import { Update_Movie } from 'src/app/contracts/movie/update-movie';
import { SweetStatus } from 'src/app/internal/sweet-alert/sweet-alert.status';
import { SweetalertService } from 'src/app/services/admin/sweetalert.service';
import { MoviesService } from 'src/app/services/common/models/movies.service';


@Component({
  selector: 'app-update',
  templateUrl: './movie-update.component.html',
  styleUrls: ['./movie-update.component.css']
})
export class MovieUpdateComponent extends BaseComponent implements OnInit {
  movies: List_Movie;
  movieId: number;
  constructor(
    private movieService: MoviesService, 
    private route: ActivatedRoute,
    private sweetAlertService: SweetalertService, 
    private router: Router, 
    spinner: NgxSpinnerService) {
    super(spinner);
  }

  ngOnInit(): void {
    this.getMovieById();
  }

  getMovieById() {
    const id = this.route.snapshot.params['id'];
    this.movieService.getMovieById(id).then((movieData) => {
      this.movies = movieData as List_Movie;
      this.movieId = id;
    })
  }

  updateMovie(formData: Update_Movie) {
    const updatedFormData = { 
      ...formData, 
      id: this.movieId 
    };
    this.movieService.updateMovie(updatedFormData, async () => {
      const result = await this.sweetAlertService.showAlert(SweetStatus.sweetSuccess);
      if (result.dismiss) {
        this.router.navigate(['/admin', 'movie-list']);
      }
    }, error => {
    });
  }
}
