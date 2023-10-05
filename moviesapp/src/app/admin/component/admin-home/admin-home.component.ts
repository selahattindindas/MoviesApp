import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Create_Category } from 'src/app/contracts/category/create-category';
import { List_Category } from 'src/app/contracts/category/list-category';
import { Update_Category } from 'src/app/contracts/category/update-category';
import { CategoryService } from 'src/app/services/common/models/category.service';

@Component({
  selector: 'app-adminhome',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent {
  categories: List_Category[] = [];
  showCreateFormFlag = false;
  newCategoryName = '';
  categoryForm: FormGroup;
  isCategoryNameReadOnly: boolean = true;
  editCategoryId: string | null = null;
  numberOfFields = 5;
  constructor(private categoryService: CategoryService,private fb: FormBuilder) {
    this.categoryForm = this.fb.group({});
    for (let i = 0; i < this.numberOfFields; i++) {
      const controlName = `name${i}`;
      this.categoryForm.addControl(controlName, new FormControl('', [Validators.required, Validators.minLength(5)]));
    }
  }

  ngOnInit(): void {
    this.getCategory();
    }

  
//////////////////GetAll/////////////////////////////
async getCategory() {
  try {
    const categoryData: Partial<List_Category[]> = await this.categoryService.get();
    this.categories = categoryData as List_Category[];
  } catch (error) {
    console.error("Hata oluştu:", error);
  }
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
    this.categoryForm.addControl(`name${categoryId}`, new FormControl(categoryItem.name, [Validators.required, Validators.minLength(5)]));
  }
}

saveChanges(categoryId: string) {
  const categoryControl = this.categoryForm.get(`name${categoryId}`);
  if (categoryControl && categoryControl.valid && this.editCategoryId) {
    const formData = categoryControl.value;
    const category: Update_Category = {
      categoryName: formData.controlName
    };
    this.categoryService.put(category, this.editCategoryId, formData).then(() => {
      this.getCategory();
      this.cancelEdit();
    });
  }
}



cancelEdit() {
  this.isCategoryNameReadOnly = true;
  this.editCategoryId = null;
  this.categoryForm.removeControl(`name${this.editCategoryId}`);
  this.getCategory();
}
}
