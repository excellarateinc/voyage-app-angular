import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { environment } from '../../../environments/environment';
import { User } from './user.model';
import { UserStatus } from './user-status.model';

@Injectable()
export class UserService {
  currentUser: User;

  constructor(private http: Http) { }

  getUsers(): Observable<Array<User>> {
    return this.http.get(`${environment.API_URL}/users`)
      .map(response => response.json())
      .catch(error => Observable.throw(error.json()));
  }

  getCurrentUser(force = false): Observable<User> {
    if (this.currentUser != null && !force) {
      return Observable.of(this.currentUser);
    }
    return this.http.get(`${environment.API_URL}/profiles/me`)
      .map(response => {
        const currentUser = response.json();
        this.currentUser = currentUser;
        return currentUser;
      })
      .catch(error => Observable.throw(error.json()));
  }

  toggleStatus(userId: string, status: UserStatus): Observable<User> {
    return this.http.put(`${environment.API_URL}/users/${userId}/account-status`, status)
      .map(response => response.json())
      .catch(error => Observable.throw(error.json()));
  }

  updateProfile(user: User): Observable<User> {
    return this.http.put(`${environment.API_URL}/profiles/me`, user)
      .map(response => response.json())
      .catch(error => Observable.throw(error.json()));
  }
}
