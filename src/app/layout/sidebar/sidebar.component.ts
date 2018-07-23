import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { UserService } from '../../core/user/user.service';
import { OverlayContainer } from '@angular/cdk/overlay';

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
  @ViewChild('sidenav') sidenav: MatSidenav;
  mobile: boolean;
  darkTheme = false;
  isAdmin = false;

  constructor(private userService: UserService, private overlayContainer: OverlayContainer) { }

  ngOnInit(): void {
    if (!this.isAuthenticated) {
      return;
    }
    this.userService.getCurrentUser()
      .subscribe(user => {
        this.isAdmin = user.roles.indexOf('Administrator') !== -1;
      });
  }

  toggleDarkTheme(): void {
    this.darkTheme = !this.darkTheme;
    if (this.darkTheme) {
      this.overlayContainer.getContainerElement().classList.add('voyage-theme-dark');
    } else {
      this.overlayContainer.getContainerElement().classList.remove('voyage-theme-dark');
    }
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
