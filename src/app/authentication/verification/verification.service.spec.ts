import { TestBed, inject, tick } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { HttpModule, Http, Response, ResponseOptions, XHRBackend, RequestMethod } from '@angular/http';
import { VerificationService } from './verification.service';
import { Verification } from './verification.model';

describe('VerificationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        VerificationService,
        { provide: XHRBackend, useClass: MockBackend }
      ]
    });
  });

  it('should ...', inject([VerificationService], (service: VerificationService) => {
    expect(service).toBeTruthy();
  }));

  describe('when calling sendCode()', () => {
    it('should call the send code API endpoint',
      inject([VerificationService, XHRBackend], (service: VerificationService, mockBackend: MockBackend) => {
        mockBackend.connections.subscribe((connection: MockConnection) => {
          expect(connection.request.method).toEqual(RequestMethod.Get);
          expect(connection.request.url).toContain('/verify/send');
        });
        service.sendCode();
    }));
  });

  describe('when calling verify()', () => {
    it('should call the verify API endpoint',
      inject([VerificationService, XHRBackend], (service: VerificationService, mockBackend: MockBackend) => {
        mockBackend.connections.subscribe((connection: MockConnection) => {
          expect(connection.request.method).toEqual(RequestMethod.Post);
          expect(connection.request.url).toContain('/verify');
          const params = JSON.parse(connection.request.getBody());
          expect(params.code).toEqual('123456');
        });
        service.verify({ code: '123456' });
    }));
  });
});
