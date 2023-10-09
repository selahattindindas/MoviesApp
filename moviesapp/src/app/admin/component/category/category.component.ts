import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
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
  @ViewChild("categoryForm", {static:true}) categoryForm: NgForm
  categories: List_Category[];
  showCreateFormFlag = false;
  newCategoryName = '';
  isCategoryNameReadOnly: boolean = true;
  editCategoryId: string | null = null;
  categoryId: string;
  model: {
    id: string;
    categoryName: string;
  } = {
    id: '',
    categoryName: ''
  };
  
  constructor(private categoryService: CategoryService) {
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
    if (this.categoryForm.valid) {
      const category = {
        categoryName: this.model.categoryName
      };
      this.categoryService.createCategory(category).then(() => {
        this.getCategory();
        this.cancelCreateForm();
      });
    }
  }

  update(categoryId: string) {
    const categoryItem = this.categories.find(item => item.id === categoryId);
    if (categoryItem) {
      this.isCategoryNameReadOnly = false;
      this.editCategoryId = categoryId;
      this.categoryForm.setValue({ name: '' });
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
