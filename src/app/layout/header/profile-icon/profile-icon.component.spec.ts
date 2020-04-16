import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from '../../../shared/shared.module';
import { Observable } from 'rxjs';
import { ProfileIconComponent } from './profile-icon.component';
import { AuthenticationService } from '../../../authentication/authentication.service';
import { UserService } from '../../../core/user/user.service';
import { BroadcastService } from '../../../core/broadcast.service';
import { AngularMaterialModule } from '../../../angular-material/angular-material.module';

describe('ProfileIconComponent', () => {
  let component: ProfileIconComponent;
  let fixture: ComponentFixture<ProfileIconComponent>;
  let userService: UserService;
  let broadcastService: BroadcastService;

  beforeEach(async(() => {

    const userServiceStub: any = {
      getCurrentUser: () => { }
    };

    const broadcastServiceStub: any = {
      profileUpdated$: Observable.create(o => o.next({}))
    };

    const authServiceStub: any = {
    };

    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        AngularMaterialModule,
        FlexLayoutModule,
        SharedModule
      ],
      declarations: [ProfileIconComponent],
      providers: [
        { provide: UserService, useValue: userServiceStub },
        { provide: BroadcastService, useValue: broadcastServiceStub },
        { provide: AuthenticationService, useValue: authServiceStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    userService = TestBed.inject(UserService);
    broadcastService = TestBed.inject(BroadcastService);
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
