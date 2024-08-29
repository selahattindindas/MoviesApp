import { HttpEvent, HttpHandler, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { SweetalertService } from '../admin/sweetalert.service';
import { Router } from '@angular/router';
import { SweetStatus } from 'src/app/internal/sweet-alert/sweet-alert.status';


@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerInterceptorService {

  constructor(private sweetAlertService: SweetalertService, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
      catchError(error => {
        switch (error.status) {
          // case HttpStatusCode.Unauthorized:
          //   const refreshToken = localStorage.getItem('refreshToken');
          //   this.userAuthService.refreshTokenLogin(refreshToken);
          //   if (!refreshToken) {
          //     const url = this.router.url;
          //     if (url == "/admin") {
          //       this.sweetAlertService.showAlert(SweetStatus.sweetExpired);
          //       this.router.navigate(['/admin/login']);
          //     }
          //     else {
          //       this.sweetAlertService.showAlert(SweetStatus.sweetUnauthorized);
          //       this.router.navigate(['/admin/login']);
          //     }
          //   }
          //   break;
          //case HttpStatusCode.Forbidden:
          case HttpStatusCode.InternalServerError:
          case HttpStatusCode.BadRequest:
          case HttpStatusCode.NotFound:
          default:
            this.sweetAlertService.showAlert(SweetStatus.serverError);
            break;
        }
        return of(error);
      })
    );
  }
}


