import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filter'
})
export class TextFilterPipe implements PipeTransform {
  transform<T>(items: T[], searchText: string, filterProperty: keyof T): T[] {
    if (!items) return [];
    if (!searchText) return items;
  
    searchText = searchText.toLowerCase();
  
    return items.filter((item: T) =>
      String(item[filterProperty]).toLowerCase().includes(searchText)
    );
  }
  
}
