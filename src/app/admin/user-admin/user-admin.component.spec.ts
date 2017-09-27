import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { UserAdminComponent } from './user-admin.component';
import { UserService } from '../../core/user/user.service';
import { User } from '../../core/user/user.model';
import { UserStatus } from '../../core/user/user-status.model';
import { Observable } from 'rxjs/Observable';

describe('UserAdminComponent', () => {
  let component: UserAdminComponent;
  let fixture: ComponentFixture<UserAdminComponent>;
  let userService: UserService;

  beforeEach(async(() => {

    const userServiceStub: any = { getUsers: () => { }, toggleStatus: () => { } };

    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        BrowserAnimationsModule,
        MaterialModule,
        FlexLayoutModule
      ],
      declarations: [ UserAdminComponent ],
      providers: [
        { provide: UserService, useValue: userServiceStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    userService = TestBed.get(UserService);
    spyOn(userService, 'getUsers').and.callFake(() => new Observable(observer => observer.next()));
    fixture = TestBed.createComponent(UserAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
    expect(userService.getUsers).toHaveBeenCalled();
  });

  describe('when toggling the user status fields', () => {
    it('should call the user service to toggle the status', () => {
      spyOn(userService, 'toggleStatus').and.callFake(() => new Observable(observer => observer.next()));
      component.selectedUser = new User();
      component.selectedUser.isVerifyRequired = true;
      component.selectedUser.isActive = false;
      component.selectedUser.id = 'test-id';
      component.onToggle();
      expect(userService.toggleStatus).toHaveBeenCalled();
    });
  });
});
