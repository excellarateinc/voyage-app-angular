import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HeaderComponent } from './header.component';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';

@Component({
  template: '',
  selector: 'app-notifications-icon'
})
class StubNotificationsIconComponent { }

@Component({
  template: '',
  selector: 'app-profile-icon'
})
class StubProfileIconComponent { }

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        AngularMaterialModule,
        FlexLayoutModule
      ],
      declarations: [
        HeaderComponent,
        StubNotificationsIconComponent,
        StubProfileIconComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
