import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthService } from '@core/auth.service';
import { environment } from '@environment';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class ApicallerService {
  apiRoot = environment.backendApiRoot;

  constructor(private http: HttpClient, private authService: AuthService) { }

  public getThingies() {
    
    const apiUrl = `${this.apiRoot}/thingies`;

    // var tokenValue = this.authService.getAuthorizationHeaderValue();

    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Authorization': tokenValue
    //   })
    // };
    // NOTE:  The error handling and bearer token inclusion are in the two INTERCEPTORS in src/shared.
    return this.http.get(apiUrl);//, httpOptions);
  }

  public getSingleThingy(id: number): any {
    let  apiUrl = `${this.apiRoot}/thingies/${id}`;
    return this.http.get(apiUrl);//, httpOptions);
  }
}
