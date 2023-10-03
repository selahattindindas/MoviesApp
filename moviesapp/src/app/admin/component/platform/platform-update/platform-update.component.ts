import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { List_Platform } from 'src/app/contracts/platform/list-platform';
import { Update_Platform } from 'src/app/contracts/platform/update-platform';
import { PlatformService } from 'src/app/services/common/models/platform.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-platform-update',
  templateUrl: './platform-update.component.html',
  styleUrls: ['./platform-update.component.css']
})
export class PlatformUpdateComponent implements OnInit {
  id : string;
  platform:List_Platform;
  updateForm: FormGroup;
  platformId: string;
  constructor(private fb:FormBuilder, private platformService: PlatformService, private activatedRoute:ActivatedRoute){
    this.updateForm = this.fb.group({
      Name: new FormControl('', [Validators.required, Validators.minLength(5)]),
    })
  }
  ngOnInit(): void {
    this.getPlatformById();
  }
  getPlatformById() {
    this.activatedRoute.params.subscribe(async (params) => {
      const platformData: Partial<List_Platform> = await this.platformService.getPlatformId(params['id']);
      if (platformData) {
        this.platform = platformData as List_Platform;
        this.platformId = params['id']; 
      }
    });
  }
  update(){
    if (this.updateForm.valid) {
      const formData = this.updateForm.value;
      const platform: Update_Platform = {
        platformName: formData.Name
      };
      this.platformService.put(platform, this.platformId, formData.Name);
    }
  }
  }
