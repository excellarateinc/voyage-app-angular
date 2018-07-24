import { Injectable } from '@angular/core';
import { OverlayContainer } from '../../../node_modules/@angular/cdk/overlay';
import { Subject, Observable } from '../../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  darkTheme = false;
  private themeChanged = new Subject<boolean>();
  themeChanged$: Observable<boolean> = this.themeChanged.asObservable();

  constructor(private overlayContainer: OverlayContainer) { }

  toggleDarkTheme(): void {
    this.darkTheme = !this.darkTheme;
    if (this.darkTheme) {
      this.overlayContainer.getContainerElement().classList.add('voyage-theme-dark');
    } else {
      this.overlayContainer.getContainerElement().classList.remove('voyage-theme-dark');
    }
    this.themeChanged.next(this.darkTheme);
  }
}
