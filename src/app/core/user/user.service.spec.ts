import { TestBed, inject } from '@angular/core/testing';
import { UserService } from './user.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('UserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        UserService,
      ],
    });
  });

  it('should ...', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));

  describe('when calling sendCode()', () => {
    it('should call the send code API endpoint',
      inject([UserService, HttpTestingController], (service: UserService, httpMock: HttpTestingController) => {
    }));
  });
});
