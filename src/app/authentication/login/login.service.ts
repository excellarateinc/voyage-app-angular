import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { AuthenticationService } from '../authentication.service';
import { Login } from './login.model';

@Injectable()
export class LoginService {

  constructor(private http: Http, private authService: AuthenticationService) { }

  login(login: Login): Observable<any> {
    // tslint:disable-next-line:max-line-length
    const body = `username=${login.username}&password=${login.password}&client_id=${environment.OAUTH_CLIENT_ID}&client_secret=${environment.OAUTH_CLIENT_SECRET}&grant_type=password`;

    const options: RequestOptionsArgs = { headers: new Headers() };
    options.headers.set('grant_type', 'password');
    options.headers.set('content-type', 'application/x-www-form-urlencoded');

    return this.http.post(`${environment.SERVER_URL}/oauth/token`, body, options)
      .map((response: any) => {
        this.authService.setToken(response.json().access_token);
        return response.json();
      })
      .catch(error => Observable.throw(error.json()));
  }
}
