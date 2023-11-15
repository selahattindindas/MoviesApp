import { Pipe, PipeTransform } from '@angular/core';
import { List_Movie } from 'src/app/contracts/movie/list-movie';
import { CategoryEnum, CategoryDescription } from 'src/app/enums/category-enum';

@Pipe({
  name: 'categoryFilter'
})
export class CategoryFilterPipe implements PipeTransform {
    transform(movies: List_Movie[], category: CategoryEnum): List_Movie[] {
      if (!category) {
        return movies; 
      }
  
      const categoryName = CategoryDescription[category];
  
      const categoryValue = category as unknown;
      if (categoryValue === CategoryEnum.Seciniz.toString()) {
        return movies; 
      } else {
        return movies.filter(movie => movie.categoryName === categoryName);
      }
    }
  }