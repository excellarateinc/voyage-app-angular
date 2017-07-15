import { TestBed, inject, tick } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { HttpModule, Http, Response, ResponseOptions, XHRBackend } from '@angular/http';
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
        let connection: any;
        mockBackend.connections.subscribe((c) => {
          connection = c;
          tick();
          expect(connection.url).toContain('/profile');
        });
    }));
  });
});
