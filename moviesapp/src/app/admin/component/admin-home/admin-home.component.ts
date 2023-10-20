import { Component, OnInit, } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { PhotoComponent } from '../photo/photo.component';
@Component({
  selector: 'app-adminhome',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  modalRef: MdbModalRef<PhotoComponent> | null = null;
  
  constructor(private modalService: MdbModalService){}
  ngOnInit(): void {   
  }
  openModal() {
    this.modalRef = this.modalService.open(PhotoComponent,{
      modalClass: 'modal-dialog-centered modal-lg',
      containerClass: 'ses'
    })
  }
  openDialog() {
    document.getElementById('myModal').style.display = 'block';
  }

  closeDialog() {
    document.getElementById('myModal').style.display = 'none';
  }
}
