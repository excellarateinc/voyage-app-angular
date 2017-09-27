import { TestBed, inject, tick } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { HttpModule, Http, Response, ResponseOptions, XHRBackend, RequestMethod } from '@angular/http';
import { RegisterService } from './register.service';
import { Register } from './register.model';

describe('RegisterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        RegisterService,
        { provide: XHRBackend, useClass: MockBackend }
      ]
    });
  });

  it('should ...', inject([RegisterService], (service: RegisterService) => {
    expect(service).toBeTruthy();
  }));

  describe('when calling register()', () => {
    it('should call the profile API endpoint',
      inject([RegisterService, XHRBackend], (service: RegisterService, mockBackend: MockBackend) => {
        const register = new Register();
        register.email = 'test@test.com';
        register.firstName = 'first';
        register.lastName = 'last';
        register.password = 'password';
        register.confirmPassword = 'password';
        register.phoneNumbers = [];
        register.username = 'user';

        mockBackend.connections.subscribe((connection: MockConnection) => {
          expect(connection.request.method).toEqual(RequestMethod.Post);
          expect(connection.request.url).toContain('/accounts');
          const params = JSON.parse(connection.request.getBody());
          expect(params.email).toEqual(register.email);
          expect(params.firstName).toEqual(register.firstName);
          expect(params.lastName).toEqual(register.lastName);
          expect(params.password).toEqual(register.password);
          expect(params.confirmPassword).toEqual(register.confirmPassword);
          expect(params.phoneNumbers).toEqual(register.phoneNumbers);
          expect(params.username).toEqual(register.username);
        });
        service.register(register);
    }));
  });
});
