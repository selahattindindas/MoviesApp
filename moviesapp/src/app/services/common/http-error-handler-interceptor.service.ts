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
    return next.handle(req).pipe(catchError(error => {
      if (error.status === 500) {
        this.sweetAlertService.showAlert(SweetHttpError.serverError);
      }else{
        switch (error.status) {
          case HttpStatusCode.InternalServerError:
            this.sweetAlertService.showAlert(SweetHttpError.serverError);
            break;
          case HttpStatusCode.BadRequest:
            this.sweetAlertService.showAlert(SweetHttpError.serverError);
            break;
          case HttpStatusCode.NotFound:
            this.sweetAlertService.showAlert(SweetHttpError.serverError);
            break;
          default:
            this.sweetAlertService.showAlert(SweetHttpError.serverError);
            break;
        }
      }
  
      return of(error);
    }
    ));
  }
}
