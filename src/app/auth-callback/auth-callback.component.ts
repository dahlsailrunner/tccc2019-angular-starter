import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlatformLocation } from '@angular/common';

import { AuthService } from '@core/auth.service'

@Component({
  selector: 'app-auth-callback',
  templateUrl: './auth-callback.component.html',
  styleUrls: ['./auth-callback.component.css'],
})
export class AuthCallbackComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router, private loc: PlatformLocation) { }

  ngOnInit() {    
    this.authService.completeAuthentication().then((state) => {

      let angularBase = window.location.origin + this.loc.getBaseHrefFromDOM();  
      var navTarget = "";
      if (state && state.indexOf(angularBase) !== -1) {
        navTarget = state.replace(angularBase, "/");   
      } else {
        navTarget = "/";
      }        

      window.history.replaceState({},
        window.document.title,
        window.location.origin + window.location.pathname);

      this.router.navigate([navTarget]);
    });
  }
}
