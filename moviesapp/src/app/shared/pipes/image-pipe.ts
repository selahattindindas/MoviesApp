import { Pipe, PipeTransform } from '@angular/core';
import { List_Photo, Photo } from 'src/app/contracts/photo/list-photo';
import { environment } from 'src/app/environments/environment';

@Pipe({
  name: 'imageArray'
})
export class imageArrayPipe implements PipeTransform {
    transform(listPhotos: Photo[], index: number): string {
        if (listPhotos && index >= 0 && index < listPhotos.length) {
          // Belirtilen indeksteki fotoğrafın "path" özelliğini kullanarak URL oluşturun
          return environment.photoUrl + listPhotos[index].path;
        } else {
          // Geçersiz indeks veya boş dizi durumunda boş bir URL döndürün veya isteğe bağlı olarak bir varsayılan URL kullanabilirsiniz
          return ''; // veya varsayılan URL
        }
      }
}
