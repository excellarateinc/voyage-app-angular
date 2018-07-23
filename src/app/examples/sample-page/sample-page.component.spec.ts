import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphComponent } from '../graph/graph.component';
import { SamplePageComponent } from './sample-page.component';

describe('SamplePageComponent', () => {
  let component: SamplePageComponent;
  let fixture: ComponentFixture<SamplePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SamplePageComponent, GraphComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SamplePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
