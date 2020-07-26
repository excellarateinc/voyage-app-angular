import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { NotificationsModule } from '../notifications/notifications.module';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ShellComponent } from './shell.component';
import { ProfileIconComponent } from './header/profile-icon/profile-icon.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { AuthenticationService } from 'app/authentication/authentication.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    AngularMaterialModule,
    SharedModule,
    NotificationsModule
  ],
  declarations: [
    HeaderComponent,
    SidebarComponent,
    ShellComponent,
    ProfileIconComponent
  ],
  exports: [ShellComponent],
  providers: [AuthenticationService]
})
export class LayoutModule { }
