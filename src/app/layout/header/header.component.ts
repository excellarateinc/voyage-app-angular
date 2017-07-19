import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NotificationService } from '../../notifications/notification.service';
import { Notification } from '../../notifications/notification.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input()
  isMobile = false;
  @Input()
  isAuthenticated = false;
  @Output() onToggleSidebar = new EventEmitter<void>();
  notifications: Array<Notification>;

  constructor(private notificationService: NotificationService) { }

  ngOnInit() {
    this.getNotifications();
  }

  toggleSidebar(): void {
    this.onToggleSidebar.emit();
  }

  getNotifications(): void {
    if (!this.isAuthenticated) {
      return;
    }
    this.notificationService.getNotifications()
      .subscribe(result => this.notifications = result);
  }
}
