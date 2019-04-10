import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthService } from '@core/auth.service';
import { environment } from '@environment';

@Injectable({
  providedIn: 'root',
})
export class ApicallerService {
  apiRoot = environment.backendApiRoot;

  constructor(private http: HttpClient, private authService: AuthService) { }

  public getProducts() {
    const realPageId = this.authService.getClaims().realPageId;
    const apiUrl = `${this.apiRoot}/user/${realPageId}/products`;

    // var tokenValue = this.authService.getAuthorizationHeaderValue();

    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Authorization': tokenValue
    //   })
    // };
    // NOTE:  The error handling and bearer token inclusion are in the two INTERCEPTORS in src/shared.
    return this.http.get(apiUrl);//, httpOptions);
  }
}
