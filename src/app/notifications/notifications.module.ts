import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsService } from './notifications.service';
import { NotificationsIconComponent } from './notifications-icon/notifications-icon.component';
import { WebNotificationsService } from './web-notifications.service';
import { AngularMaterialModule } from '../angular-material/angular-material.module';

@NgModule({
  imports: [
    CommonModule,
    AngularMaterialModule
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
