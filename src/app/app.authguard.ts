import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad, Route, UrlSegment, Data,} from '@angular/router';
import { KeycloakService, KeycloakAuthGuard } from 'keycloak-angular';
import { Observable } from 'rxjs';

@Injectable()
export class AppAuthGuard extends KeycloakAuthGuard implements CanLoad {

  constructor(protected router: Router, protected keycloakAngular: KeycloakService) {
      super(router, keycloakAngular);
  }

  canLoad(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> | Promise<boolean> {
      return new Promise(async (resolve, reject) => {
          try {
              this.authenticated = await this.keycloakAngular.isLoggedIn();
              this.roles = await this.keycloakAngular.getUserRoles(true);

              const result = await this.checkAccessAllowed(route.data);
              resolve(result);
          } catch (error) {
              reject('An error happened during access validation. Details:' + error);
          }
      });
  }

  isAccessAllowed(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
      return this.checkAccessAllowed(route.data);
  }

  checkAccessAllowed(data: Data): Promise<boolean> {
      return new Promise(async (resolve, reject) => {
          if (!this.authenticated) {
              this.keycloakAngular.login().catch(e => console.error(e));
              return reject(false);
          }

          if (!data || !data.roles || data.roles.length === 0) {
              return resolve(true);
          } else {
              if (!this.roles || this.roles.length === 0) {
                  resolve(false);
              }
              let granted = false;
              for (const requiredRole of data.roles) {
                  if (this.roles.indexOf(requiredRole) > -1) {
                      granted = true;
                      break;
                  }
              }
              resolve(granted);
          }
      });
  }
}
