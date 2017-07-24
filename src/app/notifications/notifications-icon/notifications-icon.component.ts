import { Component, OnInit, Input } from '@angular/core';
import { NotificationsService } from '../notifications.service';
import { Notification } from '../notification.model';

@Component({
  selector: 'app-notifications-icon',
  templateUrl: './notifications-icon.component.html'
})
export class NotificationsIconComponent implements OnInit {
  notifications: Array<Notification>;

  constructor(private notificationsService: NotificationsService) { }

  ngOnInit() {
    this.getNotifications();
  }

  getNotifications(): void {
    this.notificationsService.getNotifications()
      .subscribe(result => this.notifications = result);
  }

  markNotificationRead(id: number): void {
    this.notificationsService.markNotificationAsRead(id)
      .subscribe(result => {
        this.notifications = this.notifications.filter((item: Notification) => item.id !== id);
      });
  }

  markAllRead(): void {
    this.notificationsService.markAllRead()
      .subscribe(() => this.notifications = null);
  }
}
