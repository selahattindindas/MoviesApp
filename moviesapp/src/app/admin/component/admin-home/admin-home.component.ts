import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/app/environments/environment';


@Component({
  selector: 'app-adminhome',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  constructor(private renderer: Renderer2){}
  ngOnInit(): void {
      
  }
  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.renderer.addClass(event.target, 'dragging');
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.renderer.removeClass(event.target, 'dragging');
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.renderer.removeClass(event.target, 'dragging');
    this.uploadFiles(event.dataTransfer.files);
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    this.uploadFiles(input.files);
  }

  private uploadFiles(files: FileList) {
    // You can handle file uploads here, e.g., send them to a server
    for (let i = 0; i < files.length; i++) {
      const file = files.item(i);
      console.log('File selected:', file);
      // Implement your file upload logic here
    }
  }
}
