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
    return super.request(url, options);
  }

  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    options = this.setCustomHeaders(options);
    return super.get(url, options);
  }

  post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    options = this.setCustomHeaders(options);
    return super.post(url, body, options);
  }

  put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    options = this.setCustomHeaders(options);
    return super.put(url, body, options);
  }

  delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    options = this.setCustomHeaders(options);
    return super.delete(url, options);
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
}
