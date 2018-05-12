import {Injectable} from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class SecurityHttpInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authenticationService.isAuthenticated()) {
      const accessToken = this.authenticationService.getToken();
      request = request.clone({ setHeaders: { Authorization: `Bearer ${accessToken}` } });
    }

    return next.handle(request)
      .catch(errorResponse => {
        if (errorResponse.status !== 401) {
          return Observable.throw(errorResponse);
        }

        const errors = errorResponse.error;
        if (errors && errors instanceof Array) {
          const error = errors[0];
          if (error.error === 'RequireVerification') {
            this.authenticationService.goToVerification();
            return Observable.throw(errorResponse);
          }
        }

        this.authenticationService.logout();
        return Observable.throw(errorResponse);
      });
  }
}
