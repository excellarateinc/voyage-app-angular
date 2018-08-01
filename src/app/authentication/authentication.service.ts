import { Injectable, Inject } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthenticationService {
  private sessionStorageTokenKey = 'voyage.token';

  constructor(
    private location: Location,
    private router: Router,
    @Inject('Window') private window: any) { }

  getToken(): string {
    // Attempt to retrieve the token from session storage.
    let token = sessionStorage.getItem(this.sessionStorageTokenKey);
    // If not in session storage, attempt to get it from the URL.
    if (!token) {
      token = this.getTokenFromUrl();
      // If it was in the URL, save it to session storage.
      if (token) {
        sessionStorage.setItem(this.sessionStorageTokenKey, token);
      }
    }
    return token;
  }

  setToken(token: string): void {
    sessionStorage.setItem(this.sessionStorageTokenKey, token);
  }

  isAuthenticated(): boolean {
    return this.getToken() != null;
  }

  goToOauthLogin(): void {
    const RESPONSE_TYPE = 'token';
    const oauthUrl = `${environment.SERVER_URL}/oauth/authorize?client_id=${environment.OAUTH_CLIENT_ID}
&redirect_uri=${encodeURIComponent(environment.OAUTH_REDIRECT_URL)}
&response_type=${RESPONSE_TYPE}
&scope=email`;
    this.window.location.href = oauthUrl;
  }

  logout(): void {
    sessionStorage.removeItem(this.sessionStorageTokenKey);
    this.window.location.reload();
  }

  goToVerification(): void {
    this.router.navigate(['authentication/verification']);
  }

  private getTokenFromUrl(): string {
    const tokenIndex = this.window.location.href.indexOf('access_token');
    if (tokenIndex === -1) {
      return null;
    }

    const paramLength = 'access_token='.length;
    const token = this.window.location.href.substring(tokenIndex + paramLength, this.window.location.href.indexOf('&'));
    this.location.replaceState('');
    return token;
  }

}
