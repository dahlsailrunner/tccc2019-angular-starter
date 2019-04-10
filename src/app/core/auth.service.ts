import { Injectable } from '@angular/core';

import { UserManager, UserManagerSettings, User } from 'oidc-client';
import { Observable, Subject } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private manager = new UserManager(getClientSettings());
  private user: User = null;
  private onProfileCreated: Subject<any> = new Subject<any>();

  constructor() {
    this.manager.getUser().then(user => {
      this.user = user;
    });

    this.manager.events.addUserLoaded(() => {
      this.manager.getUser().then(user => {
        this.user = user;
      });
    });

  }

  isLoggedIn(): boolean {
    return this.user != null && !this.user.expired;
  }

  getProfileCreated(): Observable<any> {
    return this.onProfileCreated
      .asObservable();
  }

  getClaims(): any {
    return this.user.profile;
  }

  getAuthorizationHeaderValue(): string {
      return `${this.user.token_type} ${this.user.access_token}`;
  }

  startAuthentication(args?: any): Promise<void> {
    return this.manager.signinRedirect(args);
  }

  logout(): Promise<any> {
    return this.manager.signoutRedirect();
  }

  completeAuthentication(): Promise<string> {
    return this.manager.signinRedirectCallback().then(user => {
      const prof = this.getClaims();

      this.user = user;
      this.onProfileCreated.next(prof);
      return user.state;
    });
  }
}

export function getClientSettings(): UserManagerSettings {
    const rootPath = window.location.protocol + '//' + window.location.host;

    return {
      authority: environment.loginAuthority,
      client_id: 'implicit',
      redirect_uri: `${rootPath}/auth-callback`,
      post_logout_redirect_uri: `${rootPath}/loggedOut.html`,
      response_type: 'id_token token',
      scope: 'openid profile email api',
      filterProtocolClaims: true,
      loadUserInfo: true,
      automaticSilentRenew: true,
      accessTokenExpiringNotificationTime: 30, // number of seconds BEFORE expiration to renew -- default is 60
      silent_redirect_uri: `${rootPath}/silent-refresh.html`,
    };
}
