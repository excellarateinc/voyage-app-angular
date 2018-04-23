import {Injectable} from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class SecurityHttpInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = this.authenticationService.getToken();
    const authRequest = request.clone({setHeaders: {Authorization: `Bearer ${accessToken}`}});
    return next.handle(authRequest)
      .catch(errorResponse => {
        if (errorResponse.status === 401) {
          this.authenticationService.logout();
        }

        return Observable.throw(errorResponse.error);
      });
  }
}
