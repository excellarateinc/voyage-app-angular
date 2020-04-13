import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ShellComponent } from './shell.component';
import { AuthenticationService } from '../authentication/authentication.service';
import { AngularMaterialModule } from '../angular-material/angular-material.module';

@Component({
  template: '',
  selector: 'app-header'
})
class StubHeaderComponent {
  @Input()
  isMobile = false;
  @Input()
  isAuthenticated = false;
  @Output() onToggleSidebar = new EventEmitter<void>();
}

@Component({
  template: '',
  selector: 'app-sidebar'
})
class StubSidebarComponent {
  @Input()
  isMobile = false;
  @Input()
  isAuthenticated = false;
  @ViewChild('sidenav', { static: true })
  sidenav: any;
}

describe('ShellComponent', () => {
  let component: ShellComponent;
  let fixture: ComponentFixture<ShellComponent>;

  beforeEach(async(() => {

    const authenticationServiceStub: any = {
      isAuthenticated: () => { }
    };

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        AngularMaterialModule,
        FlexLayoutModule
      ],
      declarations: [
        ShellComponent,
        StubHeaderComponent,
        StubSidebarComponent
      ],
      providers: [
        { provide: AuthenticationService, useValue: authenticationServiceStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
