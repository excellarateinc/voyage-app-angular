import { TestBed, inject, async } from '@angular/core/testing';
import { AuthenticationService } from './authentication.service';
import { KeycloakService } from 'keycloak-angular';

describe('AuthenticationService', () => {
  let keycloakService: KeycloakService;

  beforeEach(() => {

    const keycloakServiceStub: any = { getToken: () => {}, isLoggedIn: () => {}, logout: () => {} };

    TestBed.configureTestingModule({
      providers: [
        AuthenticationService,
        { provide: KeycloakService, useValue: keycloakServiceStub }
      ]
    });

    keycloakService = TestBed.inject(KeycloakService);

  });

  it('should ...', inject([AuthenticationService], (service: AuthenticationService) => {
    expect(service).toBeTruthy();
  }));

  describe('isAuthenticated()', () => {

    it('should delegate to keycloak for isAuthenticated',
      async(inject([AuthenticationService], (service: AuthenticationService) => {
        const expectedValue = true;
        spyOn(keycloakService, 'isLoggedIn').and.returnValue(Promise.resolve(expectedValue));
        service.isAuthenticated().then( result => expect(result).toBe(expectedValue));
      })));
  });

  describe('logout()', () => {
    it('should delegate to keycloak logout',
      inject([AuthenticationService], (service: AuthenticationService) => {
        spyOn(keycloakService, 'logout').and.callThrough();
        service.logout();
        expect(keycloakService.logout).toHaveBeenCalled();
      }));
  });

});
