import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CategoryEnum, ListCategoryEnum } from 'src/app/enums/category-enum';

@Component({
  selector: 'category-filter',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  categoryEnum: { value: CategoryEnum; description: string; }[];
  selectedCategory:CategoryEnum;
  categoryList: ListCategoryEnum;
  @Output() categorySelected = new EventEmitter<CategoryEnum>();

  constructor() {
    this.categoryList = new ListCategoryEnum();
  }
  ngOnInit(): void {
    this.getCategory();
  }

  async getCategory() {
    this.categoryEnum = await this.categoryList.getCategoryEnumValues();
  }

  onCategorySelected(): void {
    this.emitCategorySelection();
  }

  private emitCategorySelection() {
    console.log("selectedCategory:", this.selectedCategory);
    this.categorySelected.emit(this.selectedCategory);
  }

}
