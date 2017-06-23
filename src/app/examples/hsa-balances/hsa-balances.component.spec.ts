import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HsaBalancesComponent } from './hsa-balances.component';

describe('HsaBalancesComponent', () => {
  let component: HsaBalancesComponent;
  let fixture: ComponentFixture<HsaBalancesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HsaBalancesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HsaBalancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
