import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { List_Platform } from 'src/app/contracts/platform/list-platform';
import { SweetCommon } from 'src/app/internal/sweet-message/common';
import { SweetPlatform } from 'src/app/internal/sweet-message/platform';
import { SweetalertService } from 'src/app/services/admin/sweetalert.service';
import { PlatformService } from 'src/app/services/common/models/platform.service';

@Component({
  selector: 'admin-platform',
  templateUrl: './platform.component.html',
  styleUrls: ['./platform.component.css']
})
export class AdminPlatform implements OnInit {
  @ViewChild("platformForm", { static: true }) platformForm: NgForm
  platform: List_Platform[] = [];
  showCreateFormFlag : boolean;
  editPlatformId: number;
  model = {name:''};

  constructor(private platformService: PlatformService, private sweetAlertService: SweetalertService) { }

  ngOnInit(): void {
    this.getPlatform();
  }

  async getPlatform() {
    return this.platformService.getAllPlatform().then((platformData) => {
      this.platform = platformData as List_Platform[];
    });
  }

  async deletePlatform(platformId: number) {
    const sweetAlertResult = await this.sweetAlertService.showAlert(SweetCommon.DeletedQuestion);
    if (sweetAlertResult.isConfirmed) {
      this.platformService.deletePlatform(platformId, () => {
        this.sweetAlertService.showAlert(SweetPlatform.deletedPlatform);
      })
        .then(() => {
          this.getPlatform();
        });
    }
  }

  showCreateForm() {
    this.showCreateFormFlag = !this.showCreateFormFlag;
    this.model.name = '';
}

  createPlatform() {
    if (!this.platformForm.valid)
      return;

    const platformName = this.model.name;

    this.platformService.createPlatform(platformName, () => {
      this.sweetAlertService.showAlert(SweetPlatform.createPlatform);
    })
    .then(() => {
      this.getPlatform();
      this.showCreateForm();
    });
  }

  showUpdateForm(platformId: number) {
    const platformItem = this.platform.find(item => item.id === platformId);
    if (platformItem) {
      this.editPlatformId = platformId;
      this.model.name = this.model.name;
      this.showCreateFormFlag = false;
    }
  }

  updatePlatform(platformId: number, action:string) {
    if (action ==='check' && this.platformForm.valid && this.editPlatformId) {
      const Platform: List_Platform = {
        id: platformId,
        name: this.model.name
      };

      this.platformService.updatePlatform(Platform, () => {
        this.sweetAlertService.showAlert(SweetPlatform.updatePlatform);
      })
      .then(() => {
        this.getPlatform();
        this.editPlatformId = null;
      });
    }
    else if(action === 'cancel'){
      this.editPlatformId = null;
    }
    this.getPlatform();
  }
}
