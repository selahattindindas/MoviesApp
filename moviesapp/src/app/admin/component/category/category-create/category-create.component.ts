import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Create_Category } from 'src/app/contracts/category/create-category';
import { CategoryService } from 'src/app/services/common/models/category.service';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css'],
})
export class CategoryCreateComponent implements OnInit {
  createForm: FormGroup;
  constructor(private fb: FormBuilder, private categoryService: CategoryService) {
    this.createForm = this.fb.group({
      Name: new FormControl('', [Validators.required, Validators.minLength(5)])
    });
  }

  ngOnInit(): void {

  }

  create() {
    if (this.createForm.valid) {
      const formData = this.createForm.value;
      const category: Create_Category = {
        categoryName: formData.Name
      };
      this.categoryService.post(category, formData.Name); 
    }
  }
}
