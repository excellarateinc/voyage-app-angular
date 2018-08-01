import { TestBed, inject } from '@angular/core/testing';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { LoginService } from './login.service';
import { Login } from './login.model';
import { AuthenticationService } from '../authentication.service';

describe('LoginService', () => {
  beforeEach(() => {

    const routerStub: any = { navigate: jasmine.createSpy('navigate') };
    const locationStub: any = { replaceState: () => { } };
    const windowStub: any = { location: { reload: () => { } } };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        LoginService,
        AuthenticationService,
        { provide: Router, useValue: routerStub },
        { provide: Location, useValue: locationStub },
        { provide: 'Window', useValue: windowStub }
      ]
    });
  });

  describe('login()', () => {
    it('should call the POST /oauth/token API endpoint',
      inject([LoginService, HttpTestingController], (service: LoginService, httpMock: HttpTestingController) => {
        let login = new Login();
        service.login(login).subscribe();
        const req = httpMock.expectOne(request => request.url.includes('/oauth/token'));
        expect(req.request.method).toEqual('POST');
      }));
  });

});
