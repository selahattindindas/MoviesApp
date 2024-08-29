import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';
import { SpinnerType } from 'src/app/constacts/spinner-enum';
import { List_Category } from 'src/app/contracts/category/list-category';
import { Update_Category } from 'src/app/contracts/category/update-category';
import { SweetStatus } from 'src/app/internal/sweet-alert/sweet-alert.status';
import { SweetalertService } from 'src/app/services/admin/sweetalert.service';
import { CategoryService } from 'src/app/services/common/models/category.service';

@Component({
  selector: 'admin-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent extends BaseComponent implements OnInit {
  categories: List_Category[] = [];
  
  constructor(
    private categoryService: CategoryService, 
    private sweetAlertService:SweetalertService,
    spinner: NgxSpinnerService) { 
      super(spinner);
    }

  ngOnInit(): void {
    this.getCategory();
  }

  async getCategory() {
    this.componentSpinner(SpinnerType.JellyBox);
    this.categoryService.getAllCategories()
      .then(categoryData => {
        this.categories = categoryData as List_Category[];
      })
      .finally(() => {
        this.spinner.hide();
      });
  }
  
  async createCategory(create = {name: ''}) { 
    this.categoryService.createCategory(create.name, () => {
      this.sweetAlertService.showAlert(SweetStatus.sweetSuccess);
    },
    error => {
    })
    .then(() => {
      this.getCategory();
    });
  }

  async updateCategory(category: Update_Category) {  
    if (!category || !category.id) 
      return;
    
    this.categoryService.updateCategory(category, () => {
      this.sweetAlertService.showAlert(SweetStatus.sweetSuccess);
    }, error => {
    }).then(() => {
      this.getCategory();
    });
  }

  async deleteCategory(categoryId: number) {
    const sweetAlertResult = await this.sweetAlertService.showAlert(SweetStatus.deletedQuestion);
    if(sweetAlertResult.isConfirmed){
      this.categoryService.deleteCategory(categoryId, ()=>{
        this.sweetAlertService.showAlert(SweetStatus.sweetSuccess);
      },
      error => {

     })
      .then(() => {
        this.getCategory();
      });
    }
  }
}
