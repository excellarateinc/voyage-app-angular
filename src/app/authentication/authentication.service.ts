import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthenticationService {
  private sessionStorageTokenKey = 'ACCESS_TOKEN';

  constructor(private router: Router) { }

  getToken(): string {
    const token = sessionStorage.getItem(this.sessionStorageTokenKey);
    return token;
  }

  goToOauthLogin(): void {
    const RESPONSE_TYPE = 'token';
    const oauthUrl = `${environment.SERVER_URL}/oauth/authorize?client_id=${environment.OAUTH_CLIENT_ID}
&redirect_uri=${encodeURIComponent(environment.OAUTH_REDIRECT_URL)}
&response_type=${RESPONSE_TYPE}
&scope=email`;
    window.location.href = oauthUrl;
  }

  logout(): void {
    sessionStorage.removeItem(this.sessionStorageTokenKey);
    this.router.navigate(['/authentication/login']);
  }

}
