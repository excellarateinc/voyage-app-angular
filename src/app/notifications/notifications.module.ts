import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { NotificationsService } from './notifications.service';
import { NotificationsIconComponent } from './notifications-icon/notifications-icon.component';
import { environment } from '../../environments/environment';
import { SignalRModule } from 'ng2-signalr';
import { SignalRConfiguration } from 'ng2-signalr';
import { WebNotificationsService } from './web-notifications.service';

export function getConfiguration(): SignalRConfiguration {
  const config = new SignalRConfiguration();
  config.hubName = 'notificationHub';
  config.url = environment.SIGNALR_URL;
  config.qs = { access_token: sessionStorage.getItem('voyage.token') };
  return config;
}

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    SignalRModule.forRoot(getConfiguration)
  ],
  declarations: [NotificationsIconComponent],
  providers: [
    NotificationsService,
    WebNotificationsService
  ],
  exports: [
    NotificationsIconComponent
  ]
})
export class NotificationsModule { }
