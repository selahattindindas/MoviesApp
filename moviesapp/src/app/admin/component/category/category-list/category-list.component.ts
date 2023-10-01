import { Component, OnInit } from '@angular/core';
import { List_Category } from 'src/app/contracts/category/list-category';
import { CategoryService } from 'src/app/services/common/models/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  category : List_Category[];
  filterText: string;
  filterName: keyof List_Category = 'name';
  constructor(private categoryService: CategoryService){}
  ngOnInit(): void {
      this.getCategory();
  }
  async getCategory(){
    const platformData: Partial<List_Category[]> = await this.categoryService.get();
    this.category = platformData as List_Category[];
  }
  deleteCategory(categoryId: string) {
    this.categoryService.delete(categoryId).then(() => {
      this.getCategory();
    });
  }
}
