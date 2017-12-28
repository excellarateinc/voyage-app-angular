import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { environment } from '../../../environments/environment';
import { User } from './user.model';
import { UserStatus } from './user-status.model';
import { map, tap } from "rxjs/operators";

@Injectable()
export class UserService {
  currentUser: User;

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.API_URL}/users`)
  }

  getCurrentUser(force = false): Observable<User> {
    if (this.currentUser != null && !force) {
      return of(this.currentUser);
    }
    return this.http.get<User>(`${environment.API_URL}/profiles/me`)
      .pipe(
        tap(currentUser => this.currentUser = currentUser)
      );
  }

  toggleStatus(userId: string, status: UserStatus): Observable<User> {
    return this.http.put<User>(`${environment.API_URL}/users/${userId}/account-status`, status);
  }

  updateProfile(user: User): Observable<User> {
    return this.http.put<User>(`${environment.API_URL}/profiles/me`, user);
  }
}
