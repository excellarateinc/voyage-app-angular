import { Component, OnInit, ViewChild, Renderer2  } from '@angular/core';
import { MdSidenav } from '@angular/material';
import { Router, NavigationStart } from '@angular/router';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MdSidenav;
  isMobile = false;
  isAuthenticated = false;

  constructor(private renderer: Renderer2, private router: Router) {
    router.events
      .filter(event => event instanceof NavigationStart)
      .subscribe((event: NavigationStart) => {
        this.isAuthenticated = event.url.indexOf('#access_token') !== -1;
      });
  }

  ngOnInit(): void {
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
