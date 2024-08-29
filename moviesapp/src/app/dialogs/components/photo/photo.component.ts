import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';
import { Create_Photo } from 'src/app/contracts/photo/add-photo';
import { List_Photo } from 'src/app/contracts/photo/list-photo';
import { SweetStatus } from 'src/app/internal/sweet-alert/sweet-alert.status';
import { SweetalertService } from 'src/app/services/admin/sweetalert.service';
import { PhotoService } from 'src/app/services/common/models/photo.service';

@Component({
  selector: 'movie-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent extends BaseComponent implements OnInit {
  @ViewChild("photoForm", { static: true }) photoForm: NgForm
  selectedFiles: File[] = [];
  photo: Create_Photo[];
  getPhoto: List_Photo[] = [];
  @Input() data!: { movieId: number };
  
  constructor(
    private photoService: PhotoService,
    private sweetAlertService: SweetalertService, 
    spinner: NgxSpinnerService, 
    private router: Router, 
    private activeModal: NgbActiveModal) {
    super(spinner);
  }

  ngOnInit(): void {
    this.getPhotoAll();
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.uploadFiles(event.dataTransfer.files);
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (this.areFilesImages(files)) {
      this.uploadFiles(files);
    }
  }
  areFilesImages(files: FileList): boolean {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file.type.startsWith('image/')) {
        return false;
      }
    }
    return true; 
  }
  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files) {
      this.selectedFiles = Array.from(inputElement.files);
    }
  }

  onUpload() {
    if (this.selectedFiles.length === 0 && this.photoForm.valid)
      return;

    const photo: Create_Photo[] = this.selectedFiles.map(name => ({
      id: this.data.movieId,
      files: name
    }));

    this.photoService.uploadPhoto(photo, async () => {

      const result = await this.sweetAlertService.showAlert(SweetStatus.sweetSuccess);
      if (result.dismiss) 
        this.router.navigate(['/admin', 'movie-list']);
    },
      error => {
        
      });
  }

  getPhotoAll() {
    if(this.data && this.data.movieId){
      this.photoService.getPhotosMovieById(this.data.movieId).then(moviePhotos => {
        if (moviePhotos) {
          this.getPhoto.push(moviePhotos as List_Photo);
         
        }
      });
    }
    
  }

  removePhoto(index: number) {
    if (index >= 0 && index < this.selectedFiles.length) {
      this.selectedFiles.splice(index, 1);
    }
  }

  deletePhoto(id: number) {
    this.photoService.deletePhoto(id, () => {
      this.sweetAlertService.showAlert(SweetStatus.deletedQuestion);
    },
      error => {
      
      })
      .then(() => {
        this.getPhoto = this.getPhoto.map(photoItem => {
          return photoItem.photos
            ? { ...photoItem, photos: photoItem.photos.filter(photo => photo.id !== id) }
            : photoItem;
        });
      });
  }

  uploadFiles(files: FileList) {
    if (files) {
      this.selectedFiles = Array.from(files);
    }
  }

  close() {
    this.activeModal.close();
  }
}
