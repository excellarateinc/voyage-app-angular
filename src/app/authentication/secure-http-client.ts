import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptionsArgs, Request, Response, ConnectionBackend, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class SecureHttpClient extends Http {

  constructor(
    protected backend: ConnectionBackend,
    protected defaultOptions: RequestOptions,
    private authenticationService: AuthenticationService) {
      super(backend, defaultOptions);
    }

  request(url: string|Request, options?: RequestOptionsArgs): Observable<Response> {
    options = this.setCustomHeaders(options);
    return this.intercept(super.request(url, options));
  }

  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    options = this.setCustomHeaders(options);
    return this.intercept(super.get(url, options));
  }

  post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    options = this.setCustomHeaders(options);
    return this.intercept(super.post(url, body, options));
  }

  put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    options = this.setCustomHeaders(options);
    return this.intercept(super.put(url, body, options));
  }

  delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    options = this.setCustomHeaders(options);
    return this.intercept(super.delete(url, options));
  }

  private setCustomHeaders(options?: RequestOptionsArgs): RequestOptionsArgs {
    if (!options) {
      options = new RequestOptions({});
    }
    const accessToken = this.authenticationService.getToken();
    if (accessToken) {
      if (!options.headers) {
        options.headers = new Headers();
      }
      options.headers.set('Authorization', `Bearer ${accessToken}`);
    }
    return options;
  }

  private intercept(request: Observable<Response>): Observable<any> {
    return request.catch((err, source) => {
      if (err.status !== 401) {
        return Observable.throw(err);
      }

      const errorList = JSON.parse(err._body);
      const error = errorList[0];
      if (error.error === 'UserDisabled') {
        this.authenticationService.logout();
      } else if (error.error === 'RequireVerification') {
        this.authenticationService.goToVerification();
      }
      return Observable.throw(err);
    });
  }
}
