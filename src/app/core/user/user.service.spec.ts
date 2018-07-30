import { TestBed, inject } from '@angular/core/testing';
import { UserService } from './user.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { User } from './user.model';

describe('UserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        UserService
      ]
    });
  });

  it('should ...', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));

  describe('when calling getUsers()', () => {
    it('should call the users API endpoint',
      inject([UserService, HttpTestingController], (service: UserService, httpMock: HttpTestingController) => {
        service.getUsers().subscribe();
        const req = httpMock.expectOne(request => request.url.includes('/users'));
        expect(req.request.method).toEqual('GET');
      }));
  });

  describe('when calling getCurrentUser()', () => {
    it('should call the user API endpoint',
      inject([UserService, HttpTestingController], (service: UserService, httpMock: HttpTestingController) => {
        service.getCurrentUser().subscribe();
        const req = httpMock.expectOne(request => request.url.includes('/profiles/me'));
        expect(req.request.method).toEqual('GET');
      }));

    it('should return the existing user if it exists',
      inject([UserService, HttpTestingController], (service: UserService, httpMock: HttpTestingController) => {
        let expectedUser = new User()
        service.currentUser = expectedUser;
        service.getCurrentUser().subscribe((actualUser: User) => {
          expect(expectedUser).toBe(actualUser);
        });

        httpMock.expectNone(request => request.url.includes('/profiles/me'));
      }));

      it('should call the user API endpoint even if it has an existing user if forced',
      inject([UserService, HttpTestingController], (service: UserService, httpMock: HttpTestingController) => {
        let expectedUser = new User()
        service.currentUser = expectedUser;
        service.getCurrentUser(true).subscribe((actualUser: User) => {
          expect(expectedUser).not.toBe(actualUser);
        });

        const req = httpMock.expectOne(request => request.url.includes('/profiles/me'));
        expect(req.request.method).toEqual('GET');
      }));
  });

  describe('when calling toggleStatus()', () => {
    it('should call the user account-status API endpoint',
      inject([UserService, HttpTestingController], (service: UserService, httpMock: HttpTestingController) => {
        service.toggleStatus(null, null).subscribe();
        const req = httpMock.expectOne(request => request.url.includes('/account-status'));
        expect(req.request.method).toEqual('PUT');
      }));
  });

  describe('when calling updateProfile()', () => {
    it('should call the profile API endpoint',
      inject([UserService, HttpTestingController], (service: UserService, httpMock: HttpTestingController) => {
        service.updateProfile(null).subscribe();
        const req = httpMock.expectOne(request => request.url.includes('/profiles/me'));
        expect(req.request.method).toEqual('PUT');
      }));
  });
});
