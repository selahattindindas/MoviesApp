import { Component, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';
import { Create_Photo } from 'src/app/contracts/photo/add-photo';
import { List_Photo } from 'src/app/contracts/photo/list-photo';
import { SpinnerType } from 'src/app/enums/spinner-enum';
import { SweetPhoto } from 'src/app/internal/sweet-message/photo';
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
  @Input() movieId:number;
  constructor(private renderer: Renderer2, private photoService: PhotoService, 
    private sweetAlertService:SweetalertService, spinner:NgxSpinnerService) {
      super(spinner);
     }

  ngOnInit(): void {
    this.getPhotoAll();
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.renderer.addClass(event.target, 'dragging');
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.uploadFiles(event.dataTransfer.files);
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    const files = event.dataTransfer.files;
    this.uploadFiles(files);
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
      id: this.movieId,
      files: name
    }));

    this.photoService.uploadPhoto(photo, async ()=>{
      this.showSpinner(SpinnerType.BallCircus);
      const result = await this.sweetAlertService.showAlert(SweetPhoto.createPhoto);
      if(result.dismiss)
          location.href= '/Admin/Movies-List';
    });
  }

  getPhotoAll() {
    this.photoService.getPhotosMovieById(this.movieId).then(moviePhotos => {
      if (moviePhotos) {
        this.getPhoto.push(moviePhotos as List_Photo);
      }
    });
  }

  removePhoto(index: number) {
    if (index >= 0 && index < this.selectedFiles.length) {
      this.selectedFiles.splice(index, 1);
    }
  }

  deletePhoto(id: number) {
    this.photoService.deletePhoto(id, ()=>{
      this.sweetAlertService.showAlert(SweetPhoto.deletedPhoto);
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
}
