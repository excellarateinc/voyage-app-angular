import { TestBed, inject, tick } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { HttpModule, Http, Response, ResponseOptions, XHRBackend } from '@angular/http';
import { UserService } from './user.service';
import { User } from './user.model';

describe('UserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        UserService,
        { provide: XHRBackend, useClass: MockBackend }
      ]
    });
  });

  it('should ...', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));

  describe('when calling sendCode()', () => {
    it('should call the send code API endpoint',
      inject([UserService, XHRBackend], (service: UserService, mockBackend: MockBackend) => {


    }));
  });
});
