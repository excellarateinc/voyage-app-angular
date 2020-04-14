import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Observable } from 'rxjs';
import { ProfileComponent } from './profile.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../core/user/user.service';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { BroadcastService } from '../core/broadcast.service';
import { throwError } from 'rxjs';

@Component({
  template: '',
  selector: 'app-profile-image'
})
class StubProfileImageComponent {
  @Input() currentImage: any;
  @Output() imageChanged = new EventEmitter<any>();
}

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let userService: UserService;

  beforeEach(async(() => {

    const userServiceStub: any = {
      getCurrentUser: () => { },
      updateProfile: () => { }
    };

    const broadcastServiceStub: any = {
      emitProfileUpdated: () => { }
    };

    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        AngularMaterialModule,
        FlexLayoutModule,
        SharedModule,
        ReactiveFormsModule
      ],
      declarations: [
        ProfileComponent,
        StubProfileImageComponent
      ],
      providers: [
        { provide: UserService, useValue: userServiceStub },
        { provide: BroadcastService, useValue: broadcastServiceStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    userService = TestBed.inject(UserService);
    spyOn(userService, 'getCurrentUser').and.returnValue(Observable.create(o => o.next({ phones: [] })));
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when saving a profile', () => {
    it('should return if the form is invalid', () => {
      spyOn(userService, 'updateProfile').and.callFake(() => new Observable(o => o.next()));
      component.profileForm.controls['firstName'].setValue('');
      component.saveProfile();
      expect(userService.updateProfile).not.toHaveBeenCalled();
    });

    it('should call the user service to update the profile if form is valid', () => {
      spyOn(userService, 'updateProfile').and.callFake(() => new Observable(o => o.next()));
      component.profileForm.controls['firstName'].setValue('test');
      component.profileForm.controls['lastName'].setValue('tester');
      component.profileForm.controls['email'].setValue('test@test.com');
      component.saveProfile();
      expect(userService.updateProfile).toHaveBeenCalled();
    });

    it('should populate profileErrors array if an error occurs during update', () => {
      spyOn(userService, 'updateProfile').and.callFake(() => throwError({ error: [{}] }));
      component.profileForm.controls['firstName'].setValue('test');
      component.profileForm.controls['lastName'].setValue('tester');
      component.profileForm.controls['email'].setValue('test@test.com');
      component.saveProfile();
      expect(userService.updateProfile).toHaveBeenCalled();
      expect(component.profileErrors.length).toBe(1);
    });

    it('should throw an error if changing password and confirm does not match', () => {
      spyOn(userService, 'updateProfile').and.callFake(() => throwError({ error: [{}] }));
      component.profileForm.controls['newPassword'].setValue('password');
      component.profileForm.controls['confirmNewPassword'].setValue('password1');
      component.saveProfile();
      expect(userService.updateProfile).not.toHaveBeenCalled();
      expect(component.profileForm.controls['confirmNewPassword'].errors).toEqual({ matchPassword: true });
    });

    it('should not throw an error if changing password and confirm password match', () => {
      spyOn(userService, 'updateProfile').and.callFake(() => throwError({ error: [{}] }));
      component.profileForm.controls['newPassword'].setValue('password');
      component.profileForm.controls['confirmNewPassword'].setValue('password');
      component.saveProfile();
      expect(userService.updateProfile).not.toHaveBeenCalled();
      expect(component.profileForm.controls['confirmNewPassword'].errors).toBeNull();
    });
  });
});
