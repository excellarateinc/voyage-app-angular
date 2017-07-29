import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { Notification } from './notification.model';

@Injectable()
export class NotificationsService {

  constructor(private http: Http) { }

  getNotifications(): Observable<Array<Notification>> {
    return this.http.get(`${environment.API_URL}/notifications`)
      .map(response => response.json())
      .catch(error => Observable.throw(error.json()));
  }

  markNotificationAsRead(id: number): Observable<void> {
    return this.http.put(`${environment.API_URL}/notifications/${id}`, { })
      .map(response => response)
      .catch(error => Observable.throw(error.json()));
  }

  markAllRead(): Observable<void> {
    return this.http.put(`${environment.API_URL}/notifications`, { })
      .map(response => response)
      .catch(error => Observable.throw(error.json()));
  }
}
