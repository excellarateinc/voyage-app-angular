import { Component, OnInit, ViewChild, Renderer2  } from '@angular/core';
import { MdSidenav } from '@angular/material';
import { AuthenticationService } from '../authentication/authentication.service';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html'
})
export class ShellComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MdSidenav;
  isMobile = false;
  isAuthenticated: boolean;

  constructor(private renderer: Renderer2, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.isAuthenticated = this.authenticationService.getToken() != null;
    this.checkWindowWidth();
    this.renderer.listen(window, 'resize', (event) => {
      this.checkWindowWidth();
    });
  }

  private checkWindowWidth(): void {
    if (!this.sidenav) {
      return;
    }
    this.isMobile = window.innerWidth <= 768;
    if (this.isMobile) {
      this.sidenav.close();
    } else {
      this.sidenav.open();
    }
  }
}
