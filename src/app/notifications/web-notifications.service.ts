import { Injectable } from "@angular/core";
@Injectable()
export class WebNotificationsService {

  private permission: string;

  requestPermission(): void {
    if (!('Notification' in window)) {
      return;
    }

    if (this.permission !== 'denied') {
      Notification.requestPermission(permission => {
        this.permission = permission;
      });
    }
  }

  displayNotification(title: string, body: string): void {
    if (this.permission === 'denied') {
      return;
    }
    navigator.serviceWorker.register('/assets/sw.js').then(registration => {
      registration.showNotification(title, { body, icon: '/favicon.ico', tag: 'notification' });
    });
  }
}
