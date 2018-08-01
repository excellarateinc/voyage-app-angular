import { TestBed, inject } from '@angular/core/testing';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

describe('AuthenticationService', () => {
  beforeEach(() => {

    const routerStub: any = { navigate: jasmine.createSpy('navigate') };
    const locationStub: any = { replaceState: () => { } };
    const windowStub: any = { location: { reload: () => { } } };

    TestBed.configureTestingModule({
      providers: [
        AuthenticationService,
        { provide: Router, useValue: routerStub },
        { provide: Location, useValue: locationStub },
        { provide: 'Window', useValue: windowStub }
      ]
    });

    let store = {};
    const mockSessionStorage = {
      getItem: (key: string): string => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      }
    };
    spyOn(localStorage, 'getItem').and.callFake(mockSessionStorage.getItem);
    spyOn(localStorage, 'setItem').and.callFake(mockSessionStorage.setItem);
    spyOn(localStorage, 'removeItem').and.callFake(mockSessionStorage.removeItem);
    spyOn(localStorage, 'clear').and.callFake(mockSessionStorage.clear);
  });

  it('should ...', inject([AuthenticationService], (service: AuthenticationService) => {
    expect(service).toBeTruthy();
  }));

  describe('getToken()', () => {

    beforeEach(() => {
      sessionStorage.clear();
    });

    it('should return the token if it exists in sessionStorage',
      inject([AuthenticationService], (service: AuthenticationService) => {
        let expectedValue = 'somevalue';
        sessionStorage.setItem(service['sessionStorageTokenKey'], expectedValue);
        expect(service.getToken()).toBe(expectedValue);
      }));

    it('should call getTokenFromUrl if the token does not exist in sessionStorage',
      inject([AuthenticationService, 'Window', Location], (service: AuthenticationService, windowStub: any, locationStub: Location) => {
        windowStub.location.href = 'access_token=123&';
        spyOn(locationStub, 'replaceState');
        let token = service.getToken();
        expect(token).toBe('123');
        expect(locationStub.replaceState).toHaveBeenCalled();
      }));

    it('should call getTokenFromUrl if the token does not exist in sessionStorage, but not store in sessionStorage if it does not exist on the url',
      inject([AuthenticationService, 'Window', Location], (service: AuthenticationService, windowStub: any, locationStub: Location) => {
        windowStub.location.href = 'blah';
        spyOn(locationStub, 'replaceState');
        let token = service.getToken();
        expect(token).toBe(null);
        expect(sessionStorage.getItem(service['sessionStorageTokenKey'])).toBeNull();
        expect(locationStub.replaceState).not.toHaveBeenCalled();
      }));
  });

  describe('setToken()', () => {
    it('should set the token in sessionStorage',
      inject([AuthenticationService, 'Window', Location], (service: AuthenticationService, windowStub: any, locationStub: Location) => {
        let expectedValue = 'tokenvalue';
        service.setToken(expectedValue);
        expect(sessionStorage.getItem(service['sessionStorageTokenKey'])).toBe(expectedValue);
      }));
  });

  describe('isAuthenticated()', () => {
    beforeEach(() => {
      sessionStorage.clear();
    });

    it('should return true if token can be retrieved',
      inject([AuthenticationService, 'Window', Location], (service: AuthenticationService, windowStub: any, locationStub: Location) => {
        let expectedValue = true;
        sessionStorage.setItem(service['sessionStorageTokenKey'], 'somevalue');
        expect(service.isAuthenticated()).toBe(expectedValue);
      }));

    it('should return false if token cannot be retrieved',
      inject([AuthenticationService, 'Window', Location], (service: AuthenticationService, windowStub: any, locationStub: Location) => {
        windowStub.location.href = 'blah';
        let expectedValue = false;
        expect(service.isAuthenticated()).toBe(expectedValue);
      }));
  });

  describe('logout()', () => {
    it('should remove the token from sessionStorage',
      inject([AuthenticationService, 'Window', Location], (service: AuthenticationService, windowStub: any, locationStub: Location) => {
        sessionStorage.setItem(service['sessionStorageTokenKey'], 'somevalue');
        spyOn(windowStub.location, 'reload');
        service.logout();
        expect(sessionStorage.getItem(service['sessionStorageTokenKey'])).toBeNull();
        expect(windowStub.location.reload).toHaveBeenCalled();
      }));
  });

  describe('goToVerification()', () => {
    it('should go to the verification route',
      inject([AuthenticationService, Router], (service: AuthenticationService, router: Router) => {
        service.goToVerification();
        expect(router.navigate).toHaveBeenCalledWith(['authentication/verification']);
      }));
  });
});
