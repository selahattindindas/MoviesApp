import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CategoryEnum } from 'src/app/enums/category-enum';
import { CategoryService } from 'src/app/services/common/models/category.service';
import { PlatformService } from 'src/app/services/common/models/platform.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  categoryEnum: CategoryEnum[] = [];
  categoryDescriptions: { value: CategoryEnum; description: string; }[];
  selectedCategory: CategoryEnum = CategoryEnum.Seciniz;

  @Output() categorySelected = new EventEmitter<CategoryEnum>();

  constructor(
    private categoryService: CategoryService,
    private platformService: PlatformService
  ) {}
  ngOnInit(): void {

  }

  onCategorySelected(): void {
    this.emitCategorySelection();
  }

  private emitCategorySelection(): void {
    this.categorySelected.emit(this.selectedCategory);
  }

}
