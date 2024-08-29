import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';
import { SpinnerType } from 'src/app/constacts/spinner-enum';
import { List_Movie } from 'src/app/contracts/movie/list-movie';
import { MoviesService } from 'src/app/services/common/models/movies.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent extends BaseComponent implements OnInit {
  movies: List_Movie;
  movieId: number;
  isMobile: boolean = false;

  constructor(private movieService: MoviesService, private route: ActivatedRoute, spinner: NgxSpinnerService) {
    super(spinner);
  }

  ngOnInit(): void {
    this.getMovieById();
    this.checkWindowSize();
    this.componentSpinner(SpinnerType.JellyBox);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.checkWindowSize();
  }

  private checkWindowSize(): void {
    this.isMobile = window.innerWidth < 767;
  }

  getMovieById() {
    this.componentSpinner(SpinnerType.JellyBox);

    const params = this.route.snapshot.params;
    this.movieService.getMovieById(params['id'])
      .then(movieData => {
        this.movies = movieData as List_Movie;
      })
      .finally(() => {
        this.spinner.hide();
      });
  }
}
