import { TestBed, inject, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { RegisterService } from './register.service';
import { Register } from './register.model';

describe('RegisterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RegisterService]
    });
  });

  it('should ...', inject([RegisterService], (service: RegisterService) => {
    expect(service).toBeTruthy();
  }));

  describe('when calling register()', () => {
    it('should call the profile API endpoint',
      inject([RegisterService, HttpTestingController], (service: RegisterService, httpMock: HttpTestingController) => {
        const register = new Register();
        register.email = 'test@test.com';
        register.firstName = 'first';
        register.lastName = 'last';
        register.password = 'password';
        register.confirmPassword = 'password';
        register.phoneNumbers = [];
        register.username = 'user';

        service.register(register).subscribe();

        const req = httpMock.expectOne(req => req.url.includes('/accounts'));
        expect(req.request.method).toEqual('POST');
        expect(req.request.body.email).toEqual(register.email);
        expect(req.request.body.firstName).toEqual(register.firstName);
        expect(req.request.body.lastName).toEqual(register.lastName);
        expect(req.request.body.password).toEqual(register.password);
        expect(req.request.body.confirmPassword).toEqual(register.confirmPassword);
        expect(req.request.body.phoneNumbers).toEqual(register.phoneNumbers);
        expect(req.request.body.username).toEqual(register.username);
    }));
  });
});
