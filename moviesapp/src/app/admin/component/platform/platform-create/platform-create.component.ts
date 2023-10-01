import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Create_Platform } from 'src/app/contracts/platform/create-platform';
import { PlatformService } from 'src/app/services/common/models/platform.service';

@Component({
  selector: 'app-create',
  templateUrl: './platform-create.component.html',
  styleUrls: ['./platform-create.component.css']
})
export class PlatformCreateComponent implements OnInit {
  createForm: FormGroup;
  constructor(private fb: FormBuilder, private platformService: PlatformService){
    this.createForm = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.minLength(5)]),
    });
  }
  ngOnInit(): void {
      
  }
  create(){
    if (this.createForm.valid) {
      const formData = this.createForm.value;
      const platform: Create_Platform = {
        platformName: formData.name
      };
      this.platformService.post(platform);
    }
  }
}
