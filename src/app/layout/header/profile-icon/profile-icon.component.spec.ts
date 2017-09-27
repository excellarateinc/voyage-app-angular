import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from '../../../shared/shared.module';
import { Observable } from 'rxjs/Observable';
import { ProfileIconComponent } from './profile-icon.component';
import { AuthenticationService } from '../../../authentication/authentication.service';
import { UserService } from '../../../core/user/user.service';
import { User } from '../../../core/user/user.model';
import { BroadcastService } from '../../../core/broadcast.service';

describe('ProfileIconComponent', () => {
  let component: ProfileIconComponent;
  let fixture: ComponentFixture<ProfileIconComponent>;
  let userService: UserService;
  let broadcastService: BroadcastService;
  let authService: AuthenticationService;

  beforeEach(async(() => {

    const userServiceStub: any = {
      getCurrentUser: () => { }
    };

    const broadcastServiceStub: any = {
    };

    const authServiceStub: any = {
    };

    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MaterialModule,
        FlexLayoutModule,
        SharedModule
      ],
      declarations: [ ProfileIconComponent ],
      providers: [
        { provide: UserService, useValue: userServiceStub },
        { provide: BroadcastService, useValue: broadcastServiceStub },
        { provide: AuthenticationService, useValue: authServiceStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    userService = TestBed.get(UserService);
    broadcastService = TestBed.get(BroadcastService);
    authService = TestBed.get(AuthenticationService);
    spyOn(userService, 'getCurrentUser').and.returnValue(Observable.create(o => o.next({})));
    broadcastService.profileUpdated$ = Observable.create(o => o.next({}));
    fixture = TestBed.createComponent(ProfileIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
