import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthenticationService } from '../../../authentication/authentication.service';
import { UserService } from '../../../core/user/user.service';
import { User } from '../../../core/user/user.model';
import { BroadcastService } from '../../../core/broadcast.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile-icon',
  templateUrl: './profile-icon.component.html',
  styleUrls: ['./profile-icon.component.scss']
})
export class ProfileIconComponent implements OnInit, OnDestroy {
  currentUser: User;
  private broadcastWatcher: Subscription;

  constructor(
    private authService: AuthenticationService,
    private userService: UserService,
    private broadcastService: BroadcastService) { }

  ngOnInit(): void {
    this.userService.getCurrentUser()
      .subscribe(user => this.currentUser = user);

    this.broadcastWatcher = this.broadcastService.profileUpdated$
      .subscribe(user => this.currentUser = user);
  }

  ngOnDestroy(): void {
    this.broadcastWatcher.unsubscribe();
  }

  logout(): void {
    this.authService.logout();
  }
}
