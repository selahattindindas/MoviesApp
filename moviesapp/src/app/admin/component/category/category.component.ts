import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { List_Category } from 'src/app/contracts/category/list-category';
import { Update_Category } from 'src/app/contracts/category/update-category';
import { SweetCategory } from 'src/app/internal/sweet-message/category';
import { SweetCommon } from 'src/app/internal/sweet-message/common';
import { SweetalertService } from 'src/app/services/admin/sweetalert.service';
import { CategoryService } from 'src/app/services/common/models/category.service';

@Component({
  selector: 'admin-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class AdminCategory implements OnInit {
  @ViewChild("categoryForm", { static: true }) categoryForm: NgForm
  listCategory: List_Category[];
  showCreateFormFlag = false;
  //showCreateFormFlag optimize
  editCategoryId: number;
  model= {name:''};
  constructor(private categoryService: CategoryService, private sweetAlertService:SweetalertService) { }

  ngOnInit(): void {
    this.getCategory();
  }

  getCategory() {
    return this.categoryService.getAllCategories().then(categoryData => {
      this.listCategory = categoryData as List_Category[];
    })
  }

  async deleteCategory(categoryId: number) {
    const sweetAlertResult = await this.sweetAlertService.showAlert(SweetCommon.DeletedQuestion);
    if(sweetAlertResult.isConfirmed){
      this.categoryService.deleteCategory(categoryId, ()=>{
        this.sweetAlertService.showAlert(SweetCategory.deletedCategory);
      })
      .then(() => {
        this.getCategory();
      });
    }
  }
  //ShowCreateForm Methodu tamamiyle düzeltilecek!
  showCreateForm(action: string) {
    if (action === 'if') {
      this.showCreateFormFlag = true;
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

    const category = this.model.name;
    

    this.categoryService.createCategory(category, ()=>{
      this.sweetAlertService.showAlert(SweetCategory.createCategory);
    })
    .then(() => {
      this.getCategory();
      this.showCreateForm('else');
    });
  }

  //Düzenlenecek Show Update Form
  showUpdateForm(categoryId: number) {
    const categoryItem = this.listCategory.find(item => item.id === categoryId);
    if (categoryItem) {
      this.editCategoryId = categoryId;
      this.model.name = this.model.name
      this.showCreateFormFlag = false;
    }
  }
  //Düzenlendi
  updateCategory(action: string, categoryId: number) {
    if (action === 'if' && this.categoryForm.valid && this.editCategoryId) {
      const category = {
        id: categoryId,
        name: this.model.name
      };

      this.categoryService.updateCategory(category, ()=>{
        this.sweetAlertService.showAlert(SweetCategory.updateCategory);
      })
      .then(() => {
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
