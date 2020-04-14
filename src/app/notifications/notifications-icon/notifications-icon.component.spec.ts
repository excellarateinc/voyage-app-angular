import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Observable } from 'rxjs';
import { NotificationsIconComponent } from './notifications-icon.component';
import { NotificationsService } from '../notifications.service';
import { Notification } from '../notification.model';
import { WebNotificationsService } from '../web-notifications.service';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';

const notificationsServiceStub: any = {
  getNotifications: () => { },
  markNotificationAsRead: () => { },
  markAllRead: () => { }
};

const webNotificationsServiceStub: any = {
  requestPermission: () => { }
};

describe('NotificationsIconComponent', () => {
  let component: NotificationsIconComponent;
  let fixture: ComponentFixture<NotificationsIconComponent>;
  let notificationsService: NotificationsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        AngularMaterialModule,
        FlexLayoutModule
      ],
      declarations: [NotificationsIconComponent],
      providers: [
        { provide: NotificationsService, useValue: notificationsServiceStub },
        { provide: WebNotificationsService, useValue: webNotificationsServiceStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    notificationsService = TestBed.inject(NotificationsService);
    spyOn(notificationsService, 'getNotifications').and.callFake(() => new Observable(observer => observer.next()));
    fixture = TestBed.createComponent(NotificationsIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should call get notifications on initialization', () => {
    expect(component).toBeTruthy();
    expect(notificationsService.getNotifications).toHaveBeenCalled();
  });

  describe('when calling markNotificationRead()', () => {
    it('should call the notifications service to mark read', () => {
      spyOn(notificationsService, 'markNotificationAsRead').and.callFake(() => new Observable(observer => observer.next()));
      component.notifications = new Array<Notification>();
      component.markNotificationRead(1);
      expect(notificationsService.markNotificationAsRead).toHaveBeenCalledWith(1);
    });
  });

  describe('when calling markAllRead()', () => {
    it('should call the notifications service to mark all read', () => {
      spyOn(notificationsService, 'markAllRead').and.callFake(() => new Observable(observer => observer.next()));
      component.markAllRead();
      expect(notificationsService.markAllRead).toHaveBeenCalled();
    });
  });
});
