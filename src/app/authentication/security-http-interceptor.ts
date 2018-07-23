
import { throwError as observableThrowError, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

import { AuthenticationService } from './authentication.service';

@Injectable()
export class SecurityHttpInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authenticationService.isAuthenticated()) {
      const accessToken = this.authenticationService.getToken();
      request = request.clone({ setHeaders: { Authorization: `Bearer ${accessToken}` } });
    }

    return next.handle(request)
      .pipe(
        catchError(errorResponse => {
          if (errorResponse.status !== 401) {
            return observableThrowError(errorResponse);
          }

          const errors = errorResponse.error;
          if (errors && errors instanceof Array) {
            const error = errors[0];
            if (error.error === '401_verify_user') {
              this.authenticationService.goToVerification();
              return observableThrowError(errorResponse);
            }
          }

          this.authenticationService.logout();
          return observableThrowError(errorResponse);
        })
      );
  }
}
