import { TestBed, inject } from '@angular/core/testing';

import { MobileService } from './mobile.service';
import { FlexLayoutModule } from '@angular/flex-layout';

describe('MobileService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FlexLayoutModule],
      providers: [MobileService]
    });
  });

  it('should be created', inject([MobileService], (service: MobileService) => {
    expect(service).toBeTruthy();
  }));
});
