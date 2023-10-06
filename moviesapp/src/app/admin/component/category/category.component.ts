import {Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Create_Category } from 'src/app/contracts/category/create-category';
import { List_Category } from 'src/app/contracts/category/list-category';
import { Update_Category } from 'src/app/contracts/category/update-category';
import { CategoryService } from 'src/app/services/common/models/category.service';

@Component({
  selector: 'admin-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class AdminCategory implements OnInit {
  categories: List_Category[] = [];
  showCreateFormFlag = false;
  newCategoryName = '';
  categoryForm: FormGroup;
  isCategoryNameReadOnly: boolean = true;
  editCategoryId: string | null = null;
  constructor(private categoryService: CategoryService,private fb: FormBuilder) {
    this.categoryForm = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.minLength(5)])
    });
  }
  ngOnInit(): void {
    this.getCategory();
  }
//////////////////GetAll/////////////////////////////
  async getCategory() {
    const categoryData: Partial<List_Category[]> = await this.categoryService.get();
    this.categories = categoryData as List_Category[];
  }
//////////////////Delete/////////////////////////////
  deleteCategory(categoryId: string) {
    this.categoryService.delete(categoryId).then(() => {
      this.getCategory();
    });
  }
//////////////////Create/////////////////////////////
  showCreateForm() {
    this.showCreateFormFlag = true;
    this.editCategoryId = null;
  }
  cancelCreateForm() {
    this.showCreateFormFlag = false;
    this.newCategoryName = '';
  }
  create() {
    if (this.categoryForm.valid) {
      const formData = this.categoryForm.value;
      const category: Create_Category = {
        categoryName: formData.name
      };
      this.categoryService.post(category, formData.name).then(() => {
        this.getCategory();
        this.cancelCreateForm();
      });
    }
  }
//////////////////UPDATE/////////////////////////////
update(categoryId: string) {
  const categoryItem = this.categories.find(item => item.id === categoryId);
  if (categoryItem) {
    this.isCategoryNameReadOnly = false;
    this.editCategoryId = categoryId;
    this.categoryForm.patchValue({ name: '' });
    this.showCreateFormFlag = false;
  }
}
saveChanges() {
  if (this.categoryForm.valid && this.editCategoryId) {
    const formData = this.categoryForm.value;
    const category: Update_Category = {
      categoryName: formData.name,
    };
    this.categoryService.put(category, this.editCategoryId, formData.name).then(() => {
      this.getCategory();
      this.cancelEdit();
    });
  }
}
  cancelEdit() {
    this.isCategoryNameReadOnly = true;
    this.editCategoryId = null;
    this.getCategory();
  }
}
