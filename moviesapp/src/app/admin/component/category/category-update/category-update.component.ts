import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { List_Category } from 'src/app/contracts/category/list-category';
import { Update_Category } from 'src/app/contracts/category/update-category';
import { CategoryService } from 'src/app/services/common/models/category.service';

@Component({
  selector: 'app-category-update',
  templateUrl: './category-update.component.html',
  styleUrls: ['./category-update.component.css']
})
export class CategoryUpdateComponent implements OnInit {
  updateForm:FormGroup;
  category: Update_Category;
  categorys: List_Category;
  categoryId: string;
constructor(private fb:FormBuilder, private categoryService:CategoryService, private activatedRoute:ActivatedRoute){
  this.updateForm = this.fb.group({
    Name: new FormControl('',[Validators.required, Validators.minLength(5)])
  })
}
ngOnInit(): void {
    this.getCategoryById();
    this.updateId();
}
getCategoryById() {
  this.activatedRoute.params.subscribe(async (params) => {
    const categoryData: Partial<List_Category> =
      await this.categoryService.getCategoryId(params['id']);
    if (categoryData && categoryData.name) this.categorys = categoryData as List_Category;
  });
}
updateId() {
  this.activatedRoute.paramMap.subscribe((params) => {
    const idParam = params.get('id');
    this.categoryId = idParam !== null ? idParam : '';
  });
}
update(categoryId:string){
  if (this.updateForm.valid) {
    const formData = this.updateForm.value;
    const category: Update_Category = {
      name: formData.Name
    };
    this.categoryService.put(category, categoryId);
  }
}
}
