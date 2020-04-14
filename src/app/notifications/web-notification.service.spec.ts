import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { WebNotificationsService } from './web-notifications.service';

describe('WebNotificationsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        WebNotificationsService
      ]
    });
  });

  describe('when calling requestPermissions()', () => {
    it('should do nothing if no Notification property on window',
      inject([WebNotificationsService], (service: WebNotificationsService) => {
        var result = service.requestPermission();
        expect(result).toBeUndefined();
        expect(service['permission']).toBeUndefined();
      }));

    it('should call Notification.requestPermission if permission not denied',
      inject([WebNotificationsService], (service: WebNotificationsService) => {
        spyOn(window['Notification'], 'requestPermission');
        service['permission'] = 'granted';
        service.requestPermission();
        expect(service['permission']).toBe('granted');
      }));

    it('should call not Notification.requestPermission if permission denied',
      inject([WebNotificationsService], (service: WebNotificationsService) => {
        spyOn(window['Notification'], 'requestPermission');
        service['permission'] = 'denied';
        service.requestPermission();
        expect(window['Notification'].requestPermission).not.toHaveBeenCalled();
      }));
  });

  describe('when calling displayNotification()', () => {
    it('should call navigator.serviceWorker.register when permission not denied',
      inject([WebNotificationsService], (service: WebNotificationsService) => {
        let mockReg = { showNotification: () => { } };
        spyOn(mockReg, 'showNotification');
        spyOn<any>(window.navigator.serviceWorker, 'register').and.returnValue({ then: (fn) => { fn(mockReg) } });
        service['permission'] = 'allowed';
        service.displayNotification('', '');
        expect(window.navigator.serviceWorker.register).toHaveBeenCalled();
        expect(mockReg.showNotification).toHaveBeenCalled();
      }));
  });

  describe('when calling displayNotification()', () => {
    it('should not call navigator.serviceWorker.register when permission is denied',
      inject([WebNotificationsService], (service: WebNotificationsService) => {
        spyOn<any>(window.navigator.serviceWorker, 'register').and.returnValue({ then: () => { } });
        service['permission'] = 'denied';
        service.displayNotification('', '');
        expect(window.navigator.serviceWorker.register).not.toHaveBeenCalled();
      }));
  });
});
