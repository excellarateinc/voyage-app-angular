import { Component, OnInit, ViewChild, Renderer2, Input } from '@angular/core';
import { MdSidenav } from '@angular/material';
import { AuthenticationService } from '../authentication/authentication.service';
import { SidebarComponent } from './sidebar/sidebar.component';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html'
})
export class ShellComponent implements OnInit {
  isMobile: boolean;
  isAuthenticated: boolean;
  @ViewChild('sidebar') sidebar: SidebarComponent;

  constructor(private renderer: Renderer2, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.isAuthenticated = this.authenticationService.getToken() != null;
    this.checkWindowWidth();
    this.renderer.listen(window, 'resize', (event) => {
      this.checkWindowWidth();
    });
  }

  onToggleSidebar(): void {
    this.sidebar.toggle();
  }

  private checkWindowWidth(): void {
    this.isMobile = window.innerWidth <= 768;
  }
}
