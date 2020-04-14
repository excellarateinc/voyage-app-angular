import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SidebarComponent } from './sidebar.component';
import { Observable } from 'rxjs';
import { UserService } from '../../core/user/user.service';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let userService: UserService;

  beforeEach(async(() => {

    const userServiceStub: any = { getCurrentUser: () => { } };

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        AngularMaterialModule,
        FlexLayoutModule
      ],
      declarations: [SidebarComponent],
      providers: [
        { provide: UserService, useValue: userServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    userService = TestBed.inject(UserService);
    spyOn(userService, 'getCurrentUser').and.callFake(() => new Observable(o => o.next()));
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('isMobile', () => {
    it('should close the sidenav when mobile', () => {
      const sidenavStub: any = { close: () => { } };
      spyOn(sidenavStub, 'close');
      component.sidenav = sidenavStub;
      component.isMobile = true;
      expect(sidenavStub.close).toHaveBeenCalled();
    });

    it('should open the sidenav when not mobile', () => {
      const sidenavStub: any = { open: () => { } };
      spyOn(sidenavStub, 'open');
      component.sidenav = sidenavStub;
      component.isMobile = false;
      expect(sidenavStub.open).toHaveBeenCalled();
    });
  });

  describe('close()', () => {
    it('should not call close on the sidenav when not mobile', () => {
      const sidenavStub: any = { close: () => { } };
      spyOn(sidenavStub, 'close');
      component.sidenav = sidenavStub;
      component.mobile = false;
      component.close();
      expect(sidenavStub.close).not.toHaveBeenCalled();
    });

    it('should call close on the sidenav when mobile', () => {
      const sidenavStub: any = { close: () => { } };
      spyOn(sidenavStub, 'close');
      component.sidenav = sidenavStub;
      component.mobile = true;
      component.close();
      expect(sidenavStub.close).toHaveBeenCalled();
    });
  });

  describe('toggle()', () => {
    it('should call toggle on sidenav', () => {
      const sidenavStub: any = { toggle: () => { } };
      spyOn(sidenavStub, 'toggle');
      component.sidenav = sidenavStub;
      component.toggle();
      expect(sidenavStub.toggle).toHaveBeenCalled();
    });
  });
});
