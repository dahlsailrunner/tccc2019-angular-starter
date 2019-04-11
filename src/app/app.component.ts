import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

import { AlertService } from '@core/alert.service';
import { AuthService } from '@core/auth.service';
import { NewPageService } from '@core/newPage.service';
import { AlertDetails } from '@models/alertDetails';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  alert: AlertDetails;
  username: string;
  fullname: string;
  pageName: string;  

  private onDestroyed: Subject<void> = new Subject<void>();

  constructor(private authService: AuthService, private newPageService: NewPageService, private alertSvc: AlertService) { }

  ngOnInit() {
    this.authService.getProfileCreated()
      .pipe(take(1))
      .subscribe(prof => this.onProfileCreated(prof));

    this.newPageService.pageHasBeenSet$
      .pipe(takeUntil(this.onDestroyed))
      .subscribe(pageName => this.onPageSet(pageName));

    this.alertSvc.setAlert$
      .pipe(takeUntil(this.onDestroyed))
      .subscribe(info => this.onSetAlert(info));

    if (this.authService.isLoggedIn()) {  // this is a hard page refresh
      this.onProfileCreated(this.authService.getClaims());
    } else {  // this is the user coming here for the first time
      const dest = window.location.pathname;

      if (dest.indexOf('auth-callback') == -1) {
        this.authService.startAuthentication({ 'state': window.location.href });
      }
    }
  }

  onSetAlert(info: AlertDetails): any {
    if (info == null) {
      this.clearAlertContent();
    } else {
      this.alert = info;      
    }
  }

  onProfileCreated(profile: any) {    
    // this is invoked at completion of the login process
    this.username = profile.email;
    this.fullname = profile.name;        
  }

  onPageSet(pageName: string) {
    this.pageName = pageName;
    this.clearAlertContent();
  }

  clearAlertContent() {
    this.alert = null;    
  }

  ngOnDestroy() {
    this.onDestroyed.next();
    this.onDestroyed.complete();
  }
}
