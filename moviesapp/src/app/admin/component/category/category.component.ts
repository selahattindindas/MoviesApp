import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Create_Category } from 'src/app/contracts/category/create-category';
import { List_Category } from 'src/app/contracts/category/list-category';
import { Update_Category } from 'src/app/contracts/category/update-category';
import { CategoryService } from 'src/app/services/common/models/category.service';

@Component({
  selector: 'admin-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
//Template Driven
export class AdminCategory implements OnInit {
  
  categories: List_Category[];
  category: List_Category;
  showCreateFormFlag = false;
  newCategoryName = '';
  categoryForm: FormGroup;
  isCategoryNameReadOnly: boolean = true;
  editCategoryId: string | null = null;
  categoryId: string;
  
  constructor(private categoryService: CategoryService, private fb: FormBuilder) {
    this.categoryForm = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.minLength(5)])
    });
  }

  ngOnInit(): void {
    this.getCategory();
  }

 getCategory(){
  return this.categoryService.getAllCategories().then(categorData=>{
    this.categories = categorData as List_Category[];
  })
 }

  deleteCategory(categoryId: string) {
    this.categoryService.deleteCategory(categoryId).then(() => {
      this.getCategory();
    });
  }

  showCreateForm() {
    this.showCreateFormFlag = true;
    this.editCategoryId = null;
  }
  //Tek koda indir
  cancelCreateForm() {
    this.showCreateFormFlag = false;
    this.newCategoryName = '';
  }

  create() {
    if (!this.categoryForm.valid)
      return;

      const category: Create_Category = {
        name: this.categoryForm.value.name
      };

      this.categoryService.createCategory(category).then(() => {
        this.getCategory();
        this.cancelCreateForm();
      });
  }

  update(categoryId: string) {
    const categoryItem = this.categories.find(item => item.id === categoryId);
    if (categoryItem) {
      this.isCategoryNameReadOnly = false;
      this.editCategoryId = categoryId;
      this.categoryForm.patchValue({ name: '' });
      this.showCreateFormFlag = false;
    }
  }

  saveChanges(categoryId: string) {
    if (this.categoryForm.valid && this.editCategoryId) {
      const formData = this.categoryForm.value;
      const category: Update_Category = {
        id: categoryId,
        name: formData.name,
      };
      this.categoryService.updateCategory(category).then(() => {
        this.getCategory();
        this.cancelEdit();
      });
    }
  }
  //Birleşecek.
  cancelEdit() {
    this.isCategoryNameReadOnly = true;
    this.editCategoryId = null;
    this.getCategory();
  }
}
