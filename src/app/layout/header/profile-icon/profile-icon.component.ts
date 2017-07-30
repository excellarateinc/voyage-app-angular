import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../authentication/authentication.service';

@Component({
  selector: 'app-profile-icon',
  templateUrl: './profile-icon.component.html',
  styleUrls: ['./profile-icon.component.scss']
})
export class ProfileIconComponent implements OnInit {

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
  }

  logout(): void {
    this.authService.logout();
  }
}
