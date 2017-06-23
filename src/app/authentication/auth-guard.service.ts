import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  canActivate(): boolean {
    const token = this.authenticationService.getToken();
    if (!token) {
      this.router.navigate(['authentication/login']);
      return false;
    }
    return true;
  }

}
