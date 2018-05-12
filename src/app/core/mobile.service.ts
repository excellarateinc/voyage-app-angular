import { Injectable } from '@angular/core';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MobileService {
  private mobile: boolean;
  private mobileChanged = new Subject<boolean>();
  mobileChanged$: Observable<boolean> = this.mobileChanged.asObservable();

  constructor(private media: ObservableMedia) {
    this.mobile = this.media.isActive('xs') || this.media.isActive('sm');
    this.media.subscribe((change: MediaChange) => {
      this.mobileChanged.next(change.mqAlias === 'xs' || change.mqAlias === 'sm');
    });
  }

  isMobile(): boolean {
    return this.mobile;
  }
}
