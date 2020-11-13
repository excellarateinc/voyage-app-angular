import { TestBed, inject, async } from '@angular/core/testing';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { AuthGuardService } from './auth-guard.service';

class MockActivatedRouteSnapshot {
  private _data: any;
  get data() {
    return this._data;
  }
}

let mockRouterStateSnapshot: RouterStateSnapshot;

describe('AuthGuardService', () => {
  let keycloakServiceSpy: jasmine.SpyObj<KeycloakService>;
  let route: ActivatedRouteSnapshot;

  beforeEach(() => {

    const keycloakServiceStub: any = { isAuthenticated: () => { }, getUserRoles: () => {}, login: () => {} };
    const routerStub: any = { navigate: (url: Array<string>) => { } };

    const spy = jasmine.createSpyObj('KeycloakService', ['isLoggedIn', 'login', 'getUserRoles']);

    TestBed.configureTestingModule({
      providers: [
        AuthGuardService,
        { provide: KeycloakService, useValue: spy },
        { provide: Router, useValue: routerStub },
        { provide: ActivatedRouteSnapshot, useClass: MockActivatedRouteSnapshot }
      ]
    });

    keycloakServiceSpy = TestBed.inject(KeycloakService) as jasmine.SpyObj<KeycloakService>;
    route = TestBed.inject(ActivatedRouteSnapshot);

  });

  it('should exist', inject([AuthGuardService], (service: AuthGuardService) => {
    expect(service).toBeTruthy();
  }));

  describe('when isAccessAllowed is called', () => {
    it('should return false if not logged in is invalid',
      async(inject([AuthGuardService, ActivatedRouteSnapshot],
        (service: AuthGuardService, next: ActivatedRouteSnapshot) => {
          keycloakServiceSpy.isLoggedIn.and.returnValue(Promise.resolve(false));
          keycloakServiceSpy.login.and.callThrough();
          mockRouterStateSnapshot = jasmine.createSpyObj<RouterStateSnapshot>('RouterStateSnapshot', ['toString']);
           service.isAccessAllowed(next, mockRouterStateSnapshot).then( isAllowed => {
            expect(isAllowed).toBe(false);
            expect(keycloakServiceSpy.login.calls.count()).toBe(1, 'spy method was called once');
          });
    })));

    it('should return false when logged in but missing required role',
      async( inject([AuthGuardService], (service: AuthGuardService) => {
          keycloakServiceSpy.isLoggedIn.and.returnValue(Promise.resolve(true));
          keycloakServiceSpy.getUserRoles.and.returnValue(['READ_ONLY']);
          mockRouterStateSnapshot = jasmine.createSpyObj<RouterStateSnapshot>('RouterStateSnapshot', ['toString']);
          spyOnProperty(route, 'data', 'get').and.returnValue( { roles: ['ADMIN'] });
          service.isAccessAllowed(route, mockRouterStateSnapshot).then( isAllowed => {
            expect(isAllowed).toBe(false);
            expect(keycloakServiceSpy.getUserRoles.calls.count()).toBe(1, 'spy method was called once');
          });
    })));

    it('should return true when logged in and has required role',
    async( inject([AuthGuardService], (service: AuthGuardService) => {
        keycloakServiceSpy.isLoggedIn.and.returnValue(Promise.resolve(true));
        keycloakServiceSpy.getUserRoles.and.returnValue(['ADMIN']);
        mockRouterStateSnapshot = jasmine.createSpyObj<RouterStateSnapshot>('RouterStateSnapshot', ['toString']);
        spyOnProperty(route, 'data', 'get').and.returnValue( { roles: ['ADMIN'] });
        service.isAccessAllowed(route, mockRouterStateSnapshot).then( isAllowed => {
          expect(isAllowed).toBe(true);
          expect(keycloakServiceSpy.getUserRoles.calls.count()).toBe(1, 'spy method was called once');
        });
  })));

    it('should return true if logged in and no roles',
      async(inject([AuthGuardService, ActivatedRouteSnapshot],
        (service: AuthGuardService, next: ActivatedRouteSnapshot) => {
          keycloakServiceSpy.isLoggedIn.and.returnValue(Promise.resolve(true));
          mockRouterStateSnapshot = jasmine.createSpyObj<RouterStateSnapshot>('RouterStateSnapshot', ['toString']);
            service.isAccessAllowed(next, mockRouterStateSnapshot).then( isAllowed => {
            expect(isAllowed).toBe(true);
            expect(keycloakServiceSpy.login).not.toHaveBeenCalled();
          });
    })));
  });
});
