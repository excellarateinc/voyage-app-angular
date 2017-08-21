import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { User } from './user/user.model';

@Injectable()
export class BroadcastService {

  // Observable string sources
  private profileUpdated = new Subject<User>();

  // Observable string streams
  profileUpdated$ = this.profileUpdated.asObservable();

  // Service message commands
  emitProfileUpdated(user: User) {
    this.profileUpdated.next(user);
  }
}
