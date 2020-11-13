import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot, ActivatedRouteSnapshot, UrlTree} from '@angular/router';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService extends KeycloakAuthGuard {
  constructor( protected router: Router, protected keycloak: KeycloakService ) {
    super(router, keycloak);
  }

  async isAccessAllowed(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    const isLoggedIn = await this.keycloak.isLoggedIn();
    if (!isLoggedIn) {
      await this.keycloak.login({
        redirectUri: window.location.origin + state.url
      });
      return false;
    }
    let requiredRoles =  [];
    if (route.data && route.data.roles) {
      requiredRoles = route.data.roles;
    }
    if ( !(requiredRoles instanceof Array) || requiredRoles.length === 0) {
      return true;
    }
    const userRoles = this.keycloak.getUserRoles(true);
    return requiredRoles.every((role) => userRoles.includes(role));
  }
}
