import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Create_Platform } from 'src/app/contracts/platform/create-platform';
import { List_Platform } from 'src/app/contracts/platform/list-platform';
import { Update_Platform } from 'src/app/contracts/platform/update-platform';
import { PlatformService } from 'src/app/services/common/models/platform.service';

@Component({
  selector: 'admin-platform',
  templateUrl: './platform.component.html',
  styleUrls: ['./platform.component.css']
})
export class AdminPlatform implements OnInit {
  platform: List_Platform[] = [];
  showCreateFormFlag = false;
  newPlatformName = '';
  platformForm: FormGroup;
  isPlatformNameReadOnly: boolean = true;
  editPlatformId: string | null = null;

  constructor(private platformService: PlatformService,private fb: FormBuilder) {
    this.platformForm = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.minLength(5)])
    });
  }

  ngOnInit(): void {
    this.getPlatform();
  }

  async getPlatform() {
    const platformData: Partial<List_Platform[]> = await this.platformService.getAllPlatform();
    this.platform = platformData as List_Platform[];
  }

  deletePlatform(platformId: string) {
    this.platformService.deletePlatform(platformId).then(() => {
      this.getPlatform();
    });
  }

  showCreateForm() {
    this.showCreateFormFlag = true;
    this.editPlatformId = null;
  }

  cancelCreateForm() {
    this.showCreateFormFlag = false;
    this.newPlatformName = '';
  }

  create() {
    if (!this.platformForm.valid) 
      return;

      const formData = this.platformForm.value;
      const platform: Create_Platform = {
        name: formData.name
      };
      this.platformService.createPlatform(platform, formData.name).then(() => {
        this.getPlatform();
        this.cancelCreateForm();
      });
  }


update(platformId: string) {
  const platformItem = this.platform.find(item => item.id === platformId);
  if (platformItem) {
    this.isPlatformNameReadOnly = false;
    this.editPlatformId = platformId;
    this.platformForm.patchValue({ name: '' });
    this.showCreateFormFlag = false;
  }
}

saveChanges(platformId:string) {
  if (this.platformForm.valid && this.editPlatformId) {
    const formData = this.platformForm.value;
    const platform: Update_Platform = {
      id: platformId,
      name: formData.name,
    };
    this.platformService.updatePlatform(platform).then(() => {
      this.getPlatform();
      this.cancelEdit();
    });
  }
}

  cancelEdit() {
    this.isPlatformNameReadOnly = true;
    this.editPlatformId = null;
    this.getPlatform();
  }
}
