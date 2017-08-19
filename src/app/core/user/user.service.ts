import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { User } from './user.model';
import { UserStatus } from './user-status.model';

@Injectable()
export class UserService {

  constructor(private http: Http) { }

  getUsers(): Observable<Array<User>> {
    return this.http.get(`${environment.API_URL}/users`)
      .map(response => response.json())
      .catch(error => Observable.throw(error.json()));
  }

  getCurrentUser(): Observable<User> {
    return this.http.get(`${environment.API_URL}/users/me`)
      .map(response => response.json())
      .catch(error => Observable.throw(error.json()));
  }

  toggleStatus(userId: string, status: UserStatus): Observable<User> {
    return this.http.put(`${environment.API_URL}/users/${userId}/account-status`, status)
      .map(response => response.json())
      .catch(error => Observable.throw(error.json()));
  }

  updateProfile(profile: any): Observable<User> {
    return this.http.put(`${environment.API_URL}/profile`, profile)
      .map(response => response.json())
      .catch(error => Observable.throw(error.json()));
  }

}
