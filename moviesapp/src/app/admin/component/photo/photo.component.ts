import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Create_Photo } from 'src/app/contracts/photo/add-photo';
import { PhotoService } from 'src/app/services/common/models/photo.service';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent {
  @ViewChild('files') files: ElementRef;
  errorMessage: string;
  movieImageDTO: any[] = [];
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
    this.files = event.target.files;
  }
  
  onUpload() {
    const formData = new FormData();
    if (this.files && this.files[0]) {
      formData.append('file', this.files[0]);
      this.photoService.uploadFile(formData, this.movieId)
        .then((response: any) => {
          this.movieImageDTO = response;
        })
        .catch((error: HttpErrorResponse) => {
          this.errorMessage = 'Yükleme başarısız oldu.';
        });
    } else {
      this.errorMessage = 'Dosya seçilmedi.';
    }
  }
  private uploadFiles(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      const file = files.item(i);
      console.log('File selected:', file);
    }
  }
}
