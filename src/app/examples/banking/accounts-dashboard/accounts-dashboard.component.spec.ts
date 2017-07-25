import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { AccountsDashboardComponent } from './accounts-dashboard.component';

describe('AccountsDashboardComponent', () => {
  let component: AccountsDashboardComponent;
  let fixture: ComponentFixture<AccountsDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MaterialModule,
        FlexLayoutModule,
        ChartsModule
      ],
      declarations: [ AccountsDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
