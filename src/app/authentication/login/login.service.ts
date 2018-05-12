import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { AuthenticationService } from '../authentication.service';
import { Login } from './login.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class LoginService {

  constructor(private http: HttpClient, private authService: AuthenticationService) { }

  login(login: Login): Observable<any> {
    // tslint:disable-next-line:max-line-length
    const body = `username=${login.username}&password=${login.password}&client_id=${environment.OAUTH_CLIENT_ID}&client_secret=${environment.OAUTH_CLIENT_SECRET}&grant_type=password`;
    const clientCreds = `${environment.OAUTH_CLIENT_ID}:${environment.OAUTH_CLIENT_SECRET}`;

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');
    headers = headers.set('Authorization', 'Basic ' + btoa(clientCreds));

    return this.http.post(`${environment.SERVER_URL}/oauth/token`, body, { headers: headers })
      .map((response: any) => {
        this.authService.setToken(response.access_token);
        return response;
      });
  }
}
