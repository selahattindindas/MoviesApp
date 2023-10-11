import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { List_Category } from 'src/app/contracts/category/list-category';
import { CategoryService } from 'src/app/services/common/models/category.service';

@Component({
  selector: 'admin-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class AdminCategory implements OnInit {
  @ViewChild("categoryForm", { static: true }) categoryForm: NgForm
  categories: List_Category[];
  showCreateFormFlag = false;
  editCategoryId: string | null = null;
  model = {
    id: '',
    name: '',
    categoryName: ''
  };
  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getCategory();
  }

  getCategory() {
    return this.categoryService.getAllCategories().then(categorData => {
      this.categories = categorData as List_Category[];
    })
  }

  deleteCategory(categoryId: string) {
    this.categoryService.deleteCategory(categoryId).then(() => {
      this.getCategory();
    });
  }

  showCreateForm(action: string) {
    if (action === 'if') {
      this.showCreateFormFlag = true;
      this.editCategoryId = null;
    }
    else if (action === 'else') {
      this.showCreateFormFlag = false;
      this.model.name = '';
    }
  }
//Düzenlendi
createCategory() {
  if (!this.categoryForm.valid) 
  return;

     const categoryName = this.model.name

    this.categoryService.createCategory(categoryName).then((sasa) => {
      console.log(sasa);
      this.getCategory();
      this.showCreateForm('else');
    });
  }

//Düzenlendi
  showUpdateForm(categoryId: string) {
    const categoryItem = this.categories.find(item => item.id === categoryId);
    if (categoryItem) {
      this.editCategoryId = categoryId;
      this.model.name = ''
      this.showCreateFormFlag = false;
    }
  }
//Düzenlendi
  updateCategory(action: string, categoryId: string) {
    if (action === 'if' && this.categoryForm.valid && this.editCategoryId) {
      const category = {
        id: categoryId,
        name: this.model.name
      };

      this.categoryService.updateCategory(category).then(() => {
        this.getCategory();
        this.editCategoryId = null;
      });
    } 
    else if (action === 'else') {
      this.editCategoryId = null;
    }
    this.getCategory();
  }
  //Düzenlendi
}
