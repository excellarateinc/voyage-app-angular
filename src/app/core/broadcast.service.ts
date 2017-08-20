import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class BroadcastService {

  // Observable string sources
  private profileUpdated = new Subject<void>();

  // Observable string streams
  profileUpdated$ = this.profileUpdated.asObservable();

  // Service message commands
  emitProfileUpdated() {
    this.profileUpdated.next();
  }
}
