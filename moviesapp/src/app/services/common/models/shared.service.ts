import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TextFilterService {
  private dataSubject = new BehaviorSubject<any[]>([]);

  constructor() {}

  setData<T>(items: T[]) {
    this.dataSubject.next(items);
  }
  filter<T>(filterText: string, filterProperty: keyof T): Observable<T[]> {
    return this.dataSubject.pipe(
      map((items) => {
        filterText = filterText.toLowerCase();
        return filterText
          ? items.filter((item: T) =>
              String(item[filterProperty]).toLowerCase().includes(filterText)
            )
          : items;
      })
    );
  }


  transform<T>(items: T[], filterText: string, filterProperty: keyof T): T[] {
    filterText = filterText.toLowerCase();
    return filterText? items.filter((m: T) =>
       String(m[filterProperty]).toLowerCase().indexOf(filterText) !== -1 ): items;
  }
}
