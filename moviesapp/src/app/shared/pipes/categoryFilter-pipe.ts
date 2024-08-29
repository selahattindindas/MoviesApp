import { Pipe, PipeTransform } from '@angular/core';
import { CategoryDescription, CategoryEnum } from 'src/app/constacts/category-enum';
import { List_Movie } from 'src/app/contracts/movie/list-movie';

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