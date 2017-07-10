import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthenticationService } from '../authentication.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authenticationService: AuthenticationService;

  beforeEach(async(() => {

    const authenticationServiceStub: any = { goToOauthLogin: () => { } };

    TestBed.configureTestingModule({
      imports: [],
      declarations: [ LoginComponent ],
      providers: [
        { provide: AuthenticationService, useValue: authenticationServiceStub }
      ]
    })
    .overrideComponent(LoginComponent, { set: { template: '' } });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    authenticationService = TestBed.get(AuthenticationService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when calling goToOauthLogin()', () => {
    it('should call the authentication service', () => {
      spyOn(authenticationService, 'goToOauthLogin');
      component.goToOauthLogin();
      expect(authenticationService.goToOauthLogin).toHaveBeenCalled();
    });
  });

});
