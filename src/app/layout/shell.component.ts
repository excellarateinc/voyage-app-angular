import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../authentication/authentication.service';
import { SidebarComponent } from './sidebar/sidebar.component';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
})
export class ShellComponent implements OnInit, OnDestroy {
  isMobile: boolean;
  isAuthenticated: boolean;
  @ViewChild('sidebar') sidebar: SidebarComponent;
  private watcher: Subscription;

  constructor(
    private authService: AuthenticationService,
    private media: ObservableMedia) { }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.isMobile = this.media.isActive('xs') || this.media.isActive('sm');
    this.watcher = this.media.subscribe((change: MediaChange) => {
      this.isMobile = change.mqAlias === 'xs' || change.mqAlias === 'sm';
    });
  }

  ngOnDestroy(): void {
    this.watcher.unsubscribe();
  }

  onToggleSidebar($event: any): void {
    this.sidebar.toggle();
  }
}
