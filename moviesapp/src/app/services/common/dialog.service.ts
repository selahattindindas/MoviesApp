import { Injectable } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Observable, from, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DiyalogService {
  constructor(private ngbModal: NgbModal) {}
  custom(content: any, config?: { [index: string]: any; }, options?: NgbModalOptions): Observable<any> {
    const modal = this.ngbModal.open(content, { backdrop: 'static', ...options });

    Object.assign(modal.componentInstance, config);

    return from(modal.result).pipe(
      catchError(error => {
        console.warn(error);
        return of(undefined);
      })
    );
  }
}
