import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { NotificationService } from './notification.service';
import { NotificationComponent } from './notification.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [NotificationComponent],
  providers: [
    NotificationService
  ],
  exports: [NotificationComponent]
})
export class NotificationsModule { }
