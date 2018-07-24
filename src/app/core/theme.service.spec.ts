import { TestBed, inject } from '@angular/core/testing';

import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ThemeService]
    });
  });

  it('should be created', inject([ThemeService], (service: ThemeService) => {
    expect(service).toBeTruthy();
  }));

  describe('when calling the toggleDarkTheme() function', () => {
    it('should toggle the dark theme flag', inject([ThemeService], (service: ThemeService) => {
      expect(service.darkTheme).toBe(false);
      service.toggleDarkTheme();
      expect(service.darkTheme).toBe(true);
    }));
  });
});
