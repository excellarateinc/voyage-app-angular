import { TestBed, inject, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { VerificationService } from './verification.service';
import { Verification } from './verification.model';

describe('VerificationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [VerificationService]
    });
  });

  it('should ...', inject([VerificationService], (service: VerificationService) => {
    expect(service).toBeTruthy();
  }));

  describe('when calling sendCode()', () => {
    it('should call the send code API endpoint',
      inject([VerificationService, HttpTestingController], (service: VerificationService, httpMock: HttpTestingController) => {
        service.sendCode().subscribe();

        const req = httpMock.expectOne(req => req.url.includes('/verify/send'));
        expect(req.request.method).toEqual('GET');
    }));
  });

  describe('when calling verify()', () => {
    it('should call the verify API endpoint',
      inject([VerificationService, HttpTestingController], (service: VerificationService, httpMock: HttpTestingController) => {
        service.verify({ code: '123456' }).subscribe();

        const req = httpMock.expectOne(req => req.url.includes('/verify'));
        expect(req.request.method).toEqual('POST');
        expect(req.request.body.code).toEqual('123456');
    }));
  });
});
