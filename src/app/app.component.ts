import { Component, OnInit, ViewChild, Renderer2  } from '@angular/core';
import { MdSidenav } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MdSidenav;
  isMobile = false;
  navMode = 'side';

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
      this.navMode = 'over';
      this.sidenav.close();
    } else {
      this.navMode = 'side';
      this.sidenav.open();
    }
  }
}
