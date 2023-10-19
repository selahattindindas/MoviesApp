import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Create_Photo } from 'src/app/contracts/photo/add-photo';
import { List_Photo } from 'src/app/contracts/photo/list-photo';
import { environment } from 'src/app/environments/environment';
import { PhotoService } from 'src/app/services/common/models/photo.service';


@Component({
  selector: 'app-adminhome',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  @ViewChild("photoForm", { static: true }) photoForm: NgForm
  @Input() movieId: string;
  selectedFiles: File[] = [];
  photo: Create_Photo[];
  getPhoto: List_Photo[] = [];
  constructor(private renderer: Renderer2, private photoService: PhotoService){}
  ngOnInit(): void {   
  }
  toggleComponent() {
    location.reload();
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

   this.photoService.uploadPhoto(photo);
 }
 getPhotoAll() {
   this.photoService.GetPhotosMovieById(this.movieId).then(moviePhotos => {
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

 deletePhoto(id: string) {
   this.photoService.DeletePhoto(id).then(() => {
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
