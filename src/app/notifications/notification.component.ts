import { Component, OnInit, Input } from '@angular/core';
import { NotificationService } from './notification.service';
import { Notification } from './notification.model';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html'
})
export class NotificationComponent implements OnInit {
  notifications: Array<Notification>;

  constructor(private notificationService: NotificationService) { }

  ngOnInit() {
    this.getNotifications();
  }

  getNotifications(): void {
    this.notificationService.getNotifications()
      .subscribe(result => this.notifications = result);
  }

  markNotificationRead(notification: Notification): void {
    this.notificationService.markNotificationAsRead(notification.id)
      .subscribe(result => {
        notification.isRead = false;
      });
  }

  markAllRead(): void {
    this.notificationService.markAllRead()
      .subscribe(result => { });
  }

}
