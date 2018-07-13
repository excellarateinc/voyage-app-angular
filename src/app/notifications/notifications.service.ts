import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Notification } from './notification.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class NotificationsService {

  constructor(private http: HttpClient) { }

  getNotifications(): Observable<Array<Notification>> {
    return this.http.get<Array<Notification>>(`${environment.API_URL}/notifications`);
  }

  markNotificationAsRead(id: number): Observable<any> {
    return this.http.put(`${environment.API_URL}/notifications/${id}`, null);
  }

  markAllRead(): Observable<any> {
    return this.http.put(`${environment.API_URL}/notifications`, null);
  }
}
