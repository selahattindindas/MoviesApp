import { HttpEvent, HttpHandler, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { SweetalertService } from '../admin/sweetalert.service';
import { SweetHttpError } from 'src/app/internal/sweet-message/http-error';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerInterceptorService {

  constructor(private sweetAlertService:SweetalertService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    return next.handle(req).pipe(
      catchError(error => {
        let sweetError = SweetHttpError.serverError;
        switch (error.status) {
          case HttpStatusCode.InternalServerError:
            sweetError = SweetHttpError.serverError;
            break;
          case HttpStatusCode.BadRequest:
            sweetError = SweetHttpError.serverError;
            break;
          case HttpStatusCode.NotFound:
            sweetError = SweetHttpError.serverError;
            break;
          default:
            sweetError = SweetHttpError.serverError;
            break;
        }
        this.sweetAlertService.showAlert(sweetError);
      return of(error);
    }
    ));
  }
}


