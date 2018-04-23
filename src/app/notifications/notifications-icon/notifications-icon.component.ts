import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { NotificationsService } from '../notifications.service';
import { Notification } from '../notification.model';
import { WebNotificationsService } from '../web-notifications.service';

@Component({
  selector: 'app-notifications-icon',
  templateUrl: './notifications-icon.component.html'
})
export class NotificationsIconComponent implements OnInit {
  notifications: Array<Notification> = [];
  private readonly notificationMessage = 'newNotification';

  constructor(
    private notificationsService: NotificationsService,
    private webNotificationsService: WebNotificationsService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getNotifications();
    this.webNotificationsService.requestPermission();
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
      .subscribe(() => this.notifications = []);
  }
}
