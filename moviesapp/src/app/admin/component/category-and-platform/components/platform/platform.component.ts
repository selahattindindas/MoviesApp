import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';
import { SpinnerType } from 'src/app/constacts/spinner-enum';
import { List_Platform } from 'src/app/contracts/platform/list-platform';
import { Update_Platform } from 'src/app/contracts/platform/update-platform';
import { SweetStatus } from 'src/app/internal/sweet-alert/sweet-alert.status';
import { SweetalertService } from 'src/app/services/admin/sweetalert.service';
import { PlatformService } from 'src/app/services/common/models/platform.service';

@Component({
  selector: 'admin-platform',
  templateUrl: './platform.component.html',
  styleUrls: ['./platform.component.css']
})
export class PlatformComponent extends BaseComponent implements OnInit {
  platforms: List_Platform[] = [];

  constructor(
    private platformService: PlatformService,
    private sweetAlertService: SweetalertService,
    spinner: NgxSpinnerService) {
    super(spinner);
  }

  ngOnInit(): void {
    this.getPlatform();
  }

  async getPlatform() {
    this.componentSpinner(SpinnerType.JellyBox);

    this.platformService.getAllPlatform()
      .then(platformData => {
        this.platforms = platformData as List_Platform[];
      })
      .finally(() => {
        this.spinner.hide();
      });
  }

  async createPlatform(create = {name: ''}) {
    this.platformService.createPlatform(create.name, () => {
      this.sweetAlertService.showAlert(SweetStatus.sweetSuccess);
    },
    error => {
    
    })
    .then(() => {
      this.getPlatform();
    });
  }

  async updatePlatform(platform: Update_Platform) {  
    if (!platform || !platform.id) {
      return;
    }
  
    this.platformService.updatePlatform(platform, () => {
      this.sweetAlertService.showAlert(SweetStatus.sweetSuccess);
    }, error => {
    }).then(() => {
      this.getPlatform();
    });
  }

  async deletePlatform(platformId: number) {
    const sweetAlertResult = await this.sweetAlertService.showAlert(SweetStatus.deletedQuestion);
    if (sweetAlertResult.isConfirmed) {
      this.platformService.deletePlatform(platformId, () => {
        this.sweetAlertService.showAlert(SweetStatus.sweetSuccess);
      },
        error => {
        })
        .then(() => {
          this.getPlatform();
        });
    }
  }
}
