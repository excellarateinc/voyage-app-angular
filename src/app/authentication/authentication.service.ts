import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Injectable()
export class AuthenticationService {
  constructor(private keycloakService: KeycloakService) { }

  async isAuthenticated(): Promise<boolean> {
    return await this.keycloakService.isLoggedIn();
  }

  async login(): Promise<void> {
    return await this.keycloakService.login();
  }

  logout(): void {
    this.keycloakService.logout();
  }
}
