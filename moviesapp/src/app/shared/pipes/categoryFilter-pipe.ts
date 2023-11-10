import { Pipe, PipeTransform } from '@angular/core';
import { List_Movie } from 'src/app/contracts/movie/list-movie';
import { CategoryEnum } from 'src/app/enums/category-enum';


@Pipe({
  name: 'categoryFilter',
})
export class CategoryFilterPipe implements PipeTransform {
  transform(items: List_Movie[], selectedCategory: CategoryEnum): List_Movie[] {
    if (selectedCategory === CategoryEnum.Seciniz) {
      return items; 
    } else {
      const categoryName = CategoryEnum[selectedCategory];
      return items.filter(item => item.categoryName === categoryName);
    }
  }
}
