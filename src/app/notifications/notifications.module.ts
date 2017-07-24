import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { NotificationsService } from './notifications.service';
import { NotificationsIconComponent } from './notifications-icon/notifications-icon.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [NotificationsIconComponent],
  providers: [
    NotificationsService
  ],
  exports: [NotificationsIconComponent]
})
export class NotificationsModule { }
