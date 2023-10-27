import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { List_Platform } from 'src/app/contracts/platform/list-platform';
import { PlatformService } from 'src/app/services/common/models/platform.service';

@Component({
  selector: 'admin-platform',
  templateUrl: './platform.component.html',
  styleUrls: ['./platform.component.css']
})
export class AdminPlatform implements OnInit {
  @ViewChild("platformForm", { static: true }) platformForm: NgForm
  platform: List_Platform[] = [];
  showCreateFormFlag = false;
  editPlatformId: number;
  model: {
    id: string;
    name: string;
  } = {
      id: '',
      name: ''
    };
  constructor(private platformService: PlatformService) {}

  ngOnInit(): void {
    this.getPlatform();
  }

   getPlatform() {
    return this.platformService.getAllPlatform().then((platformData)=>{
      this.platform = platformData as List_Platform[];
    });
  }

  deletePlatform(platformId: number) {
    this.platformService.deletePlatform(platformId).then(() => {
      this.getPlatform();
    });
  }

  showCreateForm(action: string) {
    if (action === 'if') {
      this.showCreateFormFlag = true;
      this.editPlatformId = null;
    }
    else if (action === 'else') {
      this.showCreateFormFlag = false;
      this.model.name = '';
    }
  }

  createPlatform() {
    if (!this.platformForm.valid) 
      return;

       const platformName= this.model.name;
       
      this.platformService.createPlatform(platformName).then(() => {
        this.getPlatform();
        this.showCreateForm('else');
      });
  }

showUpdateForm(platformId: number) {
  const platformItem = this.platform.find(item => item.id === platformId);
  if (platformItem) {
    this.editPlatformId = platformId;
    this.model.name = '';
    this.showCreateFormFlag = false;
  }
}

updatePlatform(action: string, PlatformId: number) {
  if (action === 'if' && this.platformForm.valid && this.editPlatformId) {
    const Platform : List_Platform ={
      id: PlatformId,
      name: this.model.name
    };

    this.platformService.updatePlatform(Platform).then(() => {
      this.getPlatform();
      this.editPlatformId = null;
    });
  } 
  else if (action === 'else') {
    this.editPlatformId = null;
  }
  this.getPlatform();
}
}
