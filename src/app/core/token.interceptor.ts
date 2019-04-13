import { Injectable } from '@angular/core';
import { HttpRequest,  HttpHandler,  HttpEvent,  HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { AlertService } from './alert.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public auth: AuthService, public alSvc: AlertService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.alSvc.clearAlert();

    request = request.clone({ headers: request.headers.append('Authorization', this.auth.getAuthorizationHeaderValue()) });   
    return next.handle(request);
  }
}
