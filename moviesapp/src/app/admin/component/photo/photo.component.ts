import { Component, OnInit, Renderer2 } from '@angular/core';
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
  movieId:string;
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

  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files) {
      this.selectedFiles = Array.from(inputElement.files);
    }
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
    const params = this.route.snapshot.params;
    this.photoService.GetPhotosMovieById(params['id']).then(moviePhotos => {
      this.getPhoto.push(moviePhotos as List_Photo);
      this.movieId = params['id'];
    });
  }
  removePhoto(id:string){
    this.photoService.DeletePhoto(id).then(()=>{
      this.getPhotoAll();
    })
  }
  private uploadFiles(files: FileList) {
    if (files) {
      this.selectedFiles = Array.from(files);
    }
  }  
}
