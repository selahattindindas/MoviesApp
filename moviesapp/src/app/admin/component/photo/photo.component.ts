import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Create_Photo } from 'src/app/contracts/photo/add-photo';
import { PhotoService } from 'src/app/services/common/models/photo.service';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent {
  selectedFiles: File[] = [];
  photo: Create_Photo[];
  movieId:string = '37';
  
  constructor(private renderer: Renderer2, private photoService:PhotoService) {}

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
  
  private uploadFiles(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      const file = files.item(i);
      console.log('File selected:', file);
    }
  }
}
