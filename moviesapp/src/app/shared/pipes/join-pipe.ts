import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'joinArray'
})
export class JoinArrayPipe<T> implements PipeTransform {
  transform(array: T[], separator: string, property: string): string {
    return [...array.map(item => this.capitalizeFirstLetter(item[property]))].join(separator);
  }

  private capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}
