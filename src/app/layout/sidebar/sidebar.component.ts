import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { UserService } from '../../core/user/user.service';
import { ThemeService } from '../../core/theme.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input()
  set isMobile(isMobile: boolean) {
    this.mobile = isMobile;
    if (!this.sidenav) {
      return;
    }
    if (this.mobile) {
      this.sidenav.close();
    } else {
      this.sidenav.open();
    }
  }
  @Input()
  isAuthenticated = false;
  @ViewChild('sidenav', { static: true }) sidenav: MatSidenav;
  mobile: boolean;
  isAdmin = false;

  constructor(private userService: UserService, public themeService: ThemeService) { }

  ngOnInit(): void {
    if (!this.isAuthenticated) {
      return;
    }
    this.userService.getCurrentUser()
      .subscribe(user => {
        this.isAdmin = user.roles.indexOf('Administrator') !== -1;
      });
  }

  toggle(): void {
    this.sidenav.toggle();
  }

  close(): void {
    if (!this.mobile) {
      return;
    }
    this.sidenav.close();
  }
}
