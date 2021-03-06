import { Injectable } from '@angular/core';
import { HttpRequest,  HttpHandler,  HttpEvent,  HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AlertService } from './alert.service';

@Injectable()
export class HandlingInterceptor implements HttpInterceptor {
  constructor(private alert: AlertService ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(tap({error: (e) => this.handleError(e, request)}));
  }

  handleError(e: any, req: HttpRequest<any>) {
    let alertLink = "";
    let alertLinkText = "";
    if (!environment.production) {
      if (e !== null && e.error !== null && e.error.Links) {
        alertLink = e.error.Links;
        alertLinkText = "View Error Logs";
      }      
    }    

    let errorMessage = 'An error occurred during an API call!';
    if (e.error.Id) {
      errorMessage = errorMessage + ' (' + e.error.Id +')';
    }
    this.alert.createAlert(
      {
        alertClass: 'alert-danger', 
        alertMessage: errorMessage, 
        alertLink: alertLink, 
        alertLinkText: alertLinkText
      });
  }
}
