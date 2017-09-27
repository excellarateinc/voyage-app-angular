import { TestBed, inject } from '@angular/core/testing';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

describe('AuthenticationService', () => {
  beforeEach(() => {

    const routerStub: any = { };
    const locationStub: any = { };
    const windowStub: any = { location: { } }

    TestBed.configureTestingModule({
      providers: [
        AuthenticationService,
        { provide: Router, useValue: routerStub },
        { provide: Location, useValue: locationStub },
        { provide: 'Window', useValue: windowStub }
      ]
    });
  });

  it('should ...', inject([AuthenticationService], (service: AuthenticationService) => {
    expect(service).toBeTruthy();
  }));
});
