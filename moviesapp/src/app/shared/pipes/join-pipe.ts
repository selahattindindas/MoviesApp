import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'joinArray'
})
export class JoinArrayPipe<T> implements PipeTransform {
  transform(array: T[], separator: string, property: string): string {
    return array.map(item => item[property]).join(separator);
  }
}
