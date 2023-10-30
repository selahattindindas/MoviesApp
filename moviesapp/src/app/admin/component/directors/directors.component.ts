import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';
import { Create_Director } from 'src/app/contracts/director/create-director';
import { List_Director } from 'src/app/contracts/director/list-director';
import { SpinnerType } from 'src/app/enums/spinner-enum';
import { SweetDirectors } from 'src/app/internal/sweet-message/directors';
import { SweetalertService } from 'src/app/services/admin/sweetalert.service';
import { DirectorService } from 'src/app/services/common/models/director.service';

@Component({
  selector: 'app-director-create',
  templateUrl: './directors.component.html',
  styleUrls: ['./directors.component.css']
})
export class DirectorsComponent extends BaseComponent implements OnInit {

  @ViewChild("directorForm", { static: true }) directorForm: NgForm
  movieId: string;
  directorValue: string = '';
  directorName: string[] = [];
  director: List_Director[];
  createDirector: Create_Director;
  constructor(private directorService: DirectorService, private route: ActivatedRoute, private sweetAlertService: SweetalertService, 
    private router: Router, spinner:NgxSpinnerService) {
      super(spinner)
     }

  ngOnInit(): void {
    this.getDirector();
  }
  getDirector() {
    const params = this.route.snapshot.params;
    this.directorService.getDirectorsMovieById(params['id']).then((directorData: Partial<List_Director | string>) => {
      if (directorData) {
        this.director = directorData as List_Director[];
        this.movieId = params['id'];
      }
    });
  }

  addDirector(event: any) {
    event.preventDefault();
    if (this.directorValue.trim() !== '') {
      this.directorName.push(this.directorValue.trim());
      this.directorValue = '';
    }
  }

  create(movieId: string) {
    if (this.directorForm.valid) {
      
      const directors: Create_Director[] = this.directorName.map(name => ({
        movieId: movieId,
        directorNames: name 
      }));
      directors.forEach(async (director) => {
        this.directorService.createDirector(director, async () => {
   
          const response = await this.sweetAlertService.showAlert(SweetDirectors.createDirectors);
          response.dismiss && this.router.navigate(['/Admin', 'Movies-List']);
        });
      }
    )}
  }

  removeDirector(id: number) {
    this.directorService.deleteDirector(id, () => {
      this.sweetAlertService.showAlert(SweetDirectors.deletedDirectors);
    })
      .then(() => {
        this.getDirector();
      })
  }

  removeCreate(index: number) {
    this.directorName.splice(index, 1);
  }

}
