import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from './user/user.model';

@Injectable()
export class BroadcastService {

  private profileUpdated = new Subject<User>();

  profileUpdated$ = this.profileUpdated.asObservable();

  emitProfileUpdated(user: User) {
    this.profileUpdated.next(user);
  }
}
