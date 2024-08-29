import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';
import { Create_Movie } from 'src/app/contracts/movie/create-movie';
import { SweetStatus } from 'src/app/internal/sweet-alert/sweet-alert.status';
import { SweetalertService } from 'src/app/services/admin/sweetalert.service';
import { MoviesService } from 'src/app/services/common/models/movies.service';


@Component({
  selector: 'movie-create',
  templateUrl: './movie-create.component.html',
  styleUrls: ['./movie-create.component.css'],
})
export class MovieCreateComponent extends BaseComponent implements OnInit {

  constructor(
    private movieService: MoviesService, 
    private sweetAlertService: SweetalertService,
    private router: Router, 
    spinner: NgxSpinnerService) {
    super(spinner);

  }

  ngOnInit(): void {

  }

  createMovie(formData: Create_Movie) {
      this.movieService.createMovie(formData, async () => {
        const result = await this.sweetAlertService.showAlert(SweetStatus.sweetSuccess);
        if (result.dismiss) 
          this.router.navigate(['/admin', 'movie-list']);
      }, error => {
     
      });
    }
  }

