import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, Headers } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { AuthenticationService } from '../authentication.service';
import { Login } from './login.model';

@Injectable()
export class LoginService {

  constructor(private http: HttpClient, private authService: AuthenticationService) { }

  login(login: Login): Observable<any> {
    // tslint:disable-next-line:max-line-length
    const body = `username=${login.username}&password=${login.password}&client_id=${environment.OAUTH_CLIENT_ID}&client_secret=${environment.OAUTH_CLIENT_SECRET}&grant_type=password`;

    const httpOptions = {
      headers: new HttpHeaders({
        'grant_type': 'password',
        'content-type': 'application/x-www-form-urlencoded'
      })
    };

    return this.http.post(`${environment.SERVER_URL}/oauth/token`, body, httpOptions)
      .map((auth: any) => {
        this.authService.setToken(auth.access_token);
        return auth.access_token;
      });
  }
}
