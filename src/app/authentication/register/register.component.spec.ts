import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Observable } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register.component';
import { Router } from '@angular/router';
import { RegisterService } from './register.service';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { MobileService } from '../../core/mobile.service';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let registerService: RegisterService;

  beforeEach(async(() => {

    const registerServiceStub: any = { register: () => { } };
    const routerStub: any = { navigate: (url: Array<string>) => { } };
    const mobileServiceStub: any = { isMobile: () => false, mobileChanged$: { subscribe: () => Observable.create(o => o.next()) } };

    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        BrowserAnimationsModule,
        AngularMaterialModule,
        FlexLayoutModule
      ],
      declarations: [RegisterComponent],
      providers: [
        { provide: RegisterService, useValue: registerServiceStub },
        { provide: Router, useValue: routerStub },
        { provide: MobileService, useValue: mobileServiceStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    registerService = TestBed.inject(RegisterService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when calling register()', () => {
    it('should return if the form is invalid', () => {
      spyOn(registerService, 'register');
      component.register();
      expect(registerService.register).not.toHaveBeenCalled();
    });

    it('should call the register service if the form is valid', () => {
      spyOn(registerService, 'register').and.callFake(() => new Observable(observer => observer.next()));
      component.registerForm.controls['firstName'].setValue('test');
      component.registerForm.controls['lastName'].setValue('test');
      component.registerForm.controls['email'].setValue('test@test.com');
      component.registerForm.controls['username'].setValue('user');
      component.registerForm.controls['password'].setValue('pass');
      component.registerForm.controls['confirmPassword'].setValue('pass');
      component.registerForm.controls['phones'].setValue([{ phoneNumber: '1231231234', phoneType: 'mobile' }]);
      component.register();
      expect(registerService.register).toHaveBeenCalled();
    });
  });

  describe('when calling the phoneNumbers() getter', () => {
    it('should retrieve the phone numbers out of the form', () => {
      component.registerForm.controls['phones'].setValue([{ phoneNumber: '1231231234', phoneType: 'mobile' }]);
      const phoneNumbers = component.phones;
      expect(phoneNumbers.length).toBe(1);
    });
  });
});
