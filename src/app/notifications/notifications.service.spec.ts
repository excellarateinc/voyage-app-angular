import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { NotificationsService } from './notifications.service';

describe('NotificationsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        NotificationsService
      ]
    });
  });

  describe('when calling getNotifications()', () => {
    it('should call the GET /notifications API endpoint',
      inject([NotificationsService, HttpTestingController], (service: NotificationsService, httpMock: HttpTestingController) => {
        service.getNotifications().subscribe();
        const req = httpMock.expectOne(request => request.url.includes('/notifications'));
        expect(req.request.method).toEqual('GET');
    }));
  });

  describe('when calling markNotificationAsRead()', () => {
    it('should call the PUT /notifications/{id} API endpoint',
      inject([NotificationsService, HttpTestingController], (service: NotificationsService, httpMock: HttpTestingController) => {
        service.markNotificationAsRead(1).subscribe();
        const req = httpMock.expectOne(request => request.url.includes('/notifications/1'));
        expect(req.request.method).toEqual('PUT');
    }));
  });

  describe('when calling markAllRead()', () => {
    it('should call the PUT /notifications API endpoint',
      inject([NotificationsService, HttpTestingController], (service: NotificationsService, httpMock: HttpTestingController) => {
        service.markAllRead().subscribe();
        const req = httpMock.expectOne(request => request.url.includes('/notifications'));
        expect(req.request.method).toEqual('PUT');
    }));
  });
});
