import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Observable } from 'rxjs/Observable';
import { ReactiveFormsModule } from '@angular/forms';
import { VerificationComponent } from './verification.component';
import { VerificationService } from './verification.service';

describe('VerificationComponent', () => {
  let component: VerificationComponent;
  let fixture: ComponentFixture<VerificationComponent>;
  let verificationService: VerificationService;

  beforeEach(async(() => {

    const verificationServiceStub: any = {
      sendCode: () => { },
      verify: () => { }
    };

    const windowStub: any = { location: { } };

    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MaterialModule,
        FlexLayoutModule
      ],
      declarations: [ VerificationComponent ],
      providers: [
        { provide: VerificationService, useValue: verificationServiceStub },
        { provide: 'Window', useValue: windowStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    verificationService = TestBed.get(VerificationService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when calling sendCode()', () => {
    it('should call the verification service to send the code', () => {
      spyOn(verificationService, 'sendCode').and.returnValue(Observable.create(o => o.next()));
      component.sendCode();
      expect(verificationService.sendCode).toHaveBeenCalled();
      expect(component.codeSent).toBe(true);
    });
  });

  describe('when calling verify()', () => {
    it('should return if the form is invalid', () => {
      spyOn(verificationService, 'verify');
      component.verify();
      expect(verificationService.verify).not.toHaveBeenCalled();
    });

    it('should set verificationFailed to true if service returns error', () => {
      spyOn(verificationService, 'verify').and.returnValue(Observable.create(o => o.error()));
      component.verificationForm.get('code').setValue('123456');
      component.verify();
      expect(verificationService.verify).toHaveBeenCalled();
      expect(component.verificationFailed).toBe(true);
    });

    it('should call the verify service successfully if form is valid', () => {
      spyOn(verificationService, 'verify').and.returnValue(Observable.create(o => o.next()));
      component.verificationForm.get('code').setValue('123456');
      component.verify();
      expect(verificationService.verify).toHaveBeenCalled();
      expect(component.verificationFailed).toBe(false);
    });
  });
});
