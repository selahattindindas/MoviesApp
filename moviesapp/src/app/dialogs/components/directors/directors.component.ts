import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Create_Director } from 'src/app/contracts/director/create-director';
import { List_Director } from 'src/app/contracts/director/list-director';
import { SweetStatus } from 'src/app/internal/sweet-alert/sweet-alert.status';
import { SweetalertService } from 'src/app/services/admin/sweetalert.service';
import { DirectorService } from 'src/app/services/common/models/director.service';

@Component({
  selector: 'app-director-create',
  templateUrl: './directors.component.html',
  styleUrls: ['./directors.component.css']
})
export class DirectorsComponent implements OnInit {
  @Input() data!: { movieId: number };
  directors: List_Director[];

  constructor(
    private directorService: DirectorService, 
    private sweetAlertService: SweetalertService, 
    private activeModal: NgbActiveModal) {}

  ngOnInit(): void {
    this.getDirectors();
  }

  getDirectors() {
    if(this.data && this.data.movieId){
      this.directorService.getDirectorsMovieById(this.data.movieId).then((directorData: Partial<List_Director | string>) => {
        if (directorData) {
          this.directors = directorData as List_Director[];
        }
      });
    }
  }
  
  onSubmit(create: Create_Director) {
      const directors = {
        ...create,
        movieId: this.data.movieId,
      };
     
        this.directorService.createDirector(directors, async () => {
         this.sweetAlertService.showAlert(SweetStatus.sweetSuccess);
 
        },
        error => {
       }).then(()=>{
        this.getDirectors();
       });

  }

  removeDirector(id: number) {
    this.directorService.deleteDirector(id, () => {
      this.sweetAlertService.showAlert(SweetStatus.sweetSuccess);
    },
    error => {
      
   })
      .then(() => {
        this.getDirectors();
      })
  }

  close() {
    this.activeModal.close();
  }
}
