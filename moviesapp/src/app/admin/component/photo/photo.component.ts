import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Create_Photo } from 'src/app/contracts/photo/add-photo';
import { List_Photo } from 'src/app/contracts/photo/list-photo';
import { PhotoService } from 'src/app/services/common/models/photo.service';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit {
  selectedFiles: File[] = [];
  photo: Create_Photo[];
  movieId:string = '37';
  getPhoto: List_Photo[] = [];
  constructor(private renderer: Renderer2, private photoService:PhotoService, private route:ActivatedRoute) {}

  ngOnInit(): void {
    this.getPhotoAll();    
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.renderer.addClass(event.target, 'dragging');
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.renderer.removeClass(event.target, 'dragging');
    this.uploadFiles(event.dataTransfer.files);
  }
  
  onDrop(event: DragEvent) {
    event.preventDefault();
    this.renderer.removeClass(event.target, 'dragging');
    const files = event.dataTransfer.files;
    this.uploadFiles(files);
  }
  onFileSelected(event: any) {
    this.selectedFiles = Array.from(event.target.files);
  }

  onUpload() {
    if (this.selectedFiles.length === 0) 
      return;

      const photo: Create_Photo[] = this.selectedFiles.map(name => ({
        id: this.movieId, 
        files: name
      }));

    this.photoService.uploadPhoto(photo)
  }
  getPhotoAll() {
    this.photoService.GetPhotosMovieById(this.movieId).then(moviePhotos => {
      this.getPhoto.push(moviePhotos as List_Photo);
    });
  }
  private uploadFiles(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      const file = files.item(i);
      console.log('File selected:', file);
    }
  }
}
