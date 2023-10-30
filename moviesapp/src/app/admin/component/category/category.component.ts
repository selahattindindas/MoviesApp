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
  updateCategories: Update_Category = {name:''};
  showCreateFormFlag : boolean; //showCreateFormFlag optimize //böyle bir şey yaptım
  editCategoryId: number;
  model= {name:''};

  constructor(private categoryService: CategoryService, private sweetAlertService:SweetalertService) { }

  ngOnInit(): void {
    this.getCategory();
  }

  async getCategory() {
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
  
  showCreateForm() { //ShowCreateForm Methodu tamamiyle düzeltilecek! //Düzenlendi
      this.showCreateFormFlag = !this.showCreateFormFlag;
      this.model.name = '';
  }

  createCategory() {
    if (!this.categoryForm.valid)
      return;

    const category = this.model.name;
    
    this.categoryService.createCategory(category, ()=>{
      this.sweetAlertService.showAlert(SweetCategory.createCategory);
    })
    .then(() => {
      this.getCategory();
      this.showCreateForm();
    });
  }

  showUpdateForm(categoryId: number) { //Düzenlenecek Show Update Form //Düzenlendi
    const categoryItem = this.listCategory.find(item => item.id === categoryId);
    if (categoryItem) {
      this.editCategoryId = categoryId;
      this.updateCategories.name = categoryItem.name;
      this.showCreateFormFlag = false;
    }
  }
 
  updateCategory(categoryId: number, action: string,) {
    if (action === 'check' && this.categoryForm.valid && this.editCategoryId) {
      const category = {
        id: categoryId,
        name: this.updateCategories.name
      };

      this.categoryService.updateCategory(category, ()=>{
        this.sweetAlertService.showAlert(SweetCategory.updateCategory);
      })
      .then(() => {
        this.getCategory();
        this.editCategoryId = null;
      });
    }
    else if (action === 'cancel') {
      this.editCategoryId = null;
    }
    this.getCategory();
  }
}
