import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MdSidenav } from '@angular/material';
import { UserService } from '../../core/user/user.service';

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
  @ViewChild('sidenav') sidenav: MdSidenav;
  mobile: boolean;
  toggleTheme: false;
  isAdmin = false;

  constructor(private userService: UserService) { }

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
