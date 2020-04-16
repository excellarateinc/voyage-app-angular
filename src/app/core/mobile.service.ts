import { Injectable } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Subject ,  Observable } from 'rxjs';

@Injectable()
export class MobileService {
  private mobile: boolean;
  private mobileChanged = new Subject<boolean>();
  mobileChanged$: Observable<boolean> = this.mobileChanged.asObservable();

  constructor(private media: MediaObserver) {
    this.mobile = this.media.isActive('xs') || this.media.isActive('sm');
    this.media.media$.subscribe((change: MediaChange) => {
      this.mobile = change.mqAlias === 'xs' || change.mqAlias === 'sm';
      this.mobileChanged.next(this.mobile);
    });
  }

  isMobile(): boolean {
    return this.mobile;
  }
}
