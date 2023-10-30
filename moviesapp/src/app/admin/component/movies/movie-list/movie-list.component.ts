import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';
import { List_Movie } from 'src/app/contracts/movie/list-movie';
import { SpinnerType } from 'src/app/enums/spinner-enum';
import { SweetCommon } from 'src/app/internal/sweet-message/common';
import { SweetMovie } from 'src/app/internal/sweet-message/movie';
import { SweetalertService } from 'src/app/services/admin/sweetalert.service';
import { MoviesService } from 'src/app/services/common/models/movies.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
})
export class MovieListComponent extends BaseComponent implements OnInit {
  movie: List_Movie[];
  filterText: string;
  filterName: keyof List_Movie = 'name';
  constructor(private movieService: MoviesService, private sweetAlertService: SweetalertService, spinner:NgxSpinnerService) {
    super(spinner)
  }

  ngOnInit(): void {
    this.componentSpinner(SpinnerType.JellyBox);
    this.getMovie();
  }

  getMovie() {
    return this.movieService.getAllMovies().then(movieData=>{
      this.movie = movieData as List_Movie[];
    })
  }

  async deleteMovie(id: number) {
    const sweetAlertResult = await this.sweetAlertService.showAlert(SweetCommon.DeletedQuestion);

    if(sweetAlertResult.isConfirmed){
       this.movieService.deleteMovie(id, ()=>{
        this.sweetAlertService.showAlert(SweetMovie.deleteMovie);
       })
       .then(() => {
        this.getMovie();
      });
    }
  }
}
