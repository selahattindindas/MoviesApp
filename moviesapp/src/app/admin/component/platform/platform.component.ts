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
  showCreateFormFlag = false;
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

    const platformName = this.model.name;

    this.platformService.createPlatform(platformName, () => {
      this.sweetAlertService.showAlert(SweetPlatform.createPlatform);
    }).then(() => {
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
      const Platform: List_Platform = {
        id: PlatformId,
        name: this.model.name
      };

      this.platformService.updatePlatform(Platform, () => {
        this.sweetAlertService.showAlert(SweetPlatform.updatePlatform);
      }).then(() => {
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
