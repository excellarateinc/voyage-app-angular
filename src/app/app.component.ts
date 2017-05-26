import { Component, OnInit, ViewChild, Renderer2  } from '@angular/core';
import { MdSidenav } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MdSidenav;
  isMobile = false;

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    this.checkWindowWidth();
    this.renderer.listen(window, 'resize', (event) => {
      this.checkWindowWidth();
    });
  }

  private checkWindowWidth(): void {
    this.isMobile = window.innerWidth <= 768;
    if (this.isMobile) {
      this.sidenav.close();
    } else {
      this.sidenav.open();
    }
  }
}
