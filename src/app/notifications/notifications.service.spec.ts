import { TestBed, inject, tick } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { HttpModule, Http, Response, ResponseOptions, XHRBackend } from '@angular/http';

import { NotificationsService } from './notifications.service';

describe('NotificationsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule ],
      providers: [
        NotificationsService,
        { provide: XHRBackend, useClass: MockBackend }
      ]
    });
  });

  describe('when calling getNotifications()', () => {
    it('should call the GET /notifications API endpoint',
      inject([NotificationsService, XHRBackend], (service: NotificationsService, mockBackend: MockBackend) => {
        let connection: any;
        mockBackend.connections.subscribe((c) => {
          connection = c;
          service.getNotifications();
          tick();
          expect(connection.url).toContain('/notifications');
        });
    }));
  });

  describe('when calling markNotificationAsRead()', () => {
    it('should call the PUT /notifications/{id} API endpoint',
      inject([NotificationsService, XHRBackend], (service: NotificationsService, mockBackend: MockBackend) => {
        let connection: any;
        mockBackend.connections.subscribe((c) => {
          connection = c;
          service.markNotificationAsRead(1);
          tick();
          expect(connection.url).toContain('/notifications/1');
        });
    }));
  });

  describe('when calling markAllRead()', () => {
    it('should call the PUT /notifications API endpoint',
      inject([NotificationsService, XHRBackend], (service: NotificationsService, mockBackend: MockBackend) => {
        let connection: any;
        mockBackend.connections.subscribe((c) => {
          connection = c;
          service.markAllRead();
          tick();
          expect(connection.url).toContain('/notifications');
        });
    }));
  });
});
