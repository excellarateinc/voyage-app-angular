import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../authentication/authentication.service';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ThemeService } from '../core/theme.service';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html'
})
export class ShellComponent implements OnInit, OnDestroy {
  isMobile: boolean;
  isAuthenticated: boolean;
  @ViewChild('sidebar', { static: true }) sidebar: SidebarComponent;
  private watcher: Subscription;

  constructor(
    private authService: AuthenticationService,
    private media: MediaObserver,
    public themeService: ThemeService) { }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.isMobile = this.media.isActive('xs') || this.media.isActive('sm');
    this.watcher = this.media.media$.subscribe((change: MediaChange) => {
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
