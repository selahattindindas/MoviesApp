import { Pipe, PipeTransform } from '@angular/core';
import { List_Photo, Photo } from 'src/app/contracts/photo/list-photo';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'imageArray'
})
export class imageArrayPipe implements PipeTransform {
    transform(listPhotos: Photo[], index: number): string | null {
        if (listPhotos && index >= 0 && index < listPhotos.length) {
          return environment.photoUrl + listPhotos[index].path;
        } else {
          
          return null;
        }
      }
}
