import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = localStorage.getItem('accessToken');
    const url = "http://localhost:5211/v1/Auth";
    
    if (req.url.startsWith(`${url}/Login`) || req.url.startsWith(`${url}/Create`)) {
      return next.handle(req); 
    }
    
    if (accessToken) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`
        }
      });
    }
    
    return next.handle(req);
  }
}