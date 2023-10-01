import { Injectable } from '@angular/core';
import { CategoryDescription, CategoryEnum } from 'src/app/enums/category-enum';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor() {}
  getCategoryEnumValues(): CategoryEnum[] {
    const enumValues = Object.values(CategoryEnum) as CategoryEnum[];
    return enumValues.filter((value) => typeof value === 'number');
  }
  getCategoryDescriptions(): { [key in number]: string } {
    return CategoryDescription;
  }
}
