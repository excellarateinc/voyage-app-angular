import { TestBed, inject } from '@angular/core/testing';
import { Http } from '@angular/http';
import { RegisterService } from './register.service';

describe('RegisterService', () => {
  beforeEach(() => {

    const httpStub: any = { };

    TestBed.configureTestingModule({
      providers: [
        RegisterService,
        { provide: Http, useValue: httpStub }
      ]
    });
  });

  it('should ...', inject([RegisterService], (service: RegisterService) => {
    expect(service).toBeTruthy();
  }));
});
