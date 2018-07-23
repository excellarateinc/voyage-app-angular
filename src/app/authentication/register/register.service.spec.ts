import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RegisterService } from './register.service';
import { Register } from './register.model';

describe('RegisterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        RegisterService
      ]
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
      register.phones = [];
      register.username = 'user';
      service.register(register).subscribe();

      const req = httpMock.expectOne(request => request.url.includes('/profiles/register'));
      expect(req.request.method).toEqual('POST');
    }));
  });
});
