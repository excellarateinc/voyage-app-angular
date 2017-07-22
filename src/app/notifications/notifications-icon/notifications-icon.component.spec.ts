import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationsIconComponent } from './notifications-icon.component';

describe('NotificationComponent', () => {
  let component: NotificationsIconComponent;
  let fixture: ComponentFixture<NotificationsIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationsIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationsIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
