import { Component, Renderer2 } from '@angular/core';
import { Create_Photo } from 'src/app/contracts/photo/add-photo';
import { PhotoService } from 'src/app/services/common/models/photo.service';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent {
  selectedImage: string;
  selectedName: string;
   photo: Create_Photo = {
    id: '',
    fileName: '' 
  };
  fileName: string[] = [];
  movieId:string;
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

    if (files.length > 0) {
      this.selectedImage = URL.createObjectURL(files[0]);
      this.selectedName = files[0].name; 
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const files = input.files;

    if (files.length > 0) {
      this.selectedImage = URL.createObjectURL(files[0]);
      this.selectedName = files[0].name; 
    }
  }
  createPhoto(movieId:string){
    const photo: Create_Photo[] = this.fileName.map(name => ({
      id: movieId,
      fileName: name
    }));
    for (const image of photo) {
      this.photoService.post(image, movieId);
    }
  }
  private uploadFiles(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      const file = files.item(i);
      console.log('File selected:', file);
    }
  }
}
