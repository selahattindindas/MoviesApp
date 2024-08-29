import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';
import { SpinnerType } from 'src/app/constacts/spinner-enum';
import { List_Movie } from 'src/app/contracts/movie/list-movie';
import { DirectorsComponent } from 'src/app/dialogs/components/directors/directors.component';
import { PhotoComponent } from 'src/app/dialogs/components/photo/photo.component';
import { PlayersComponent } from 'src/app/dialogs/components/players/players.component';
import { SweetStatus } from 'src/app/internal/sweet-alert/sweet-alert.status';
import { SweetalertService } from 'src/app/services/admin/sweetalert.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { MoviesService } from 'src/app/services/common/models/movies.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
})
export class MovieListComponent extends BaseComponent implements OnInit {
  movie: List_Movie[] = [];
  filterText: string;
  filterName: keyof List_Movie = 'name';
  
  constructor(
    private movieService: MoviesService, 
    private sweetAlertService: SweetalertService, 
    spinner: NgxSpinnerService,
    private dialogService: DialogService) {
    super(spinner)
  }

  ngOnInit(): void {
    this.getMovie();
  }

  async getMovie() {
    this.componentSpinner(SpinnerType.JellyBox); 

    this.movieService.getAllMovies()
      .then(movieData => {
        this.movie = movieData as List_Movie[];
      })
      .finally(() => {
        this.spinner.hide(); 
      });
  }

  async deleteMovie(id: number) {
    const sweetAlertResult = await this.sweetAlertService.showAlert(SweetStatus.deletedQuestion);

    if (sweetAlertResult.isConfirmed) {
      this.movieService.deleteMovie(id, () => {
        this.sweetAlertService.showAlert(SweetStatus.sweetSuccess);
      },
      error => {
       
      })
      .then(() => {
        this.getMovie();
      });
    }
  }

  async showDirectors(movieId: number) {
    this.dialogService.openDialog({
      componentType: DirectorsComponent,
      data: { movieId },
    });
  }

  async showPlayers(movieId: number) {
    this.dialogService.openDialog({
      componentType: PlayersComponent,
      data: { movieId },
    });
  }

  async showPhoto(movieId: number) {
    this.dialogService.openDialog({
      componentType: PhotoComponent,
      data: { movieId },
    });
  }
}
