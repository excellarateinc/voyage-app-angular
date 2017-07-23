import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Observable } from 'rxjs/Observable';
import { NotificationsIconComponent } from './notifications-icon.component';
import { NotificationsService } from '../notifications.service';
import { Notification } from '../notification.model';

const notificationsServiceStub: any = {
  getNotifications: () => { },
  markNotificationAsRead: () => { },
  markAllRead: () => { }
};

describe('NotificationsIconComponent', () => {
  let component: NotificationsIconComponent;
  let fixture: ComponentFixture<NotificationsIconComponent>;
  let notificationsService: NotificationsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MaterialModule,
        FlexLayoutModule
      ],
      declarations: [ NotificationsIconComponent ],
      providers: [
        { provide: NotificationsService, useValue: notificationsServiceStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    notificationsService = TestBed.get(NotificationsService);
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
