import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { Register } from './register.model';

@Injectable()
export class RegisterService {

  constructor(private http: Http) { }

  register(register: Register): Observable<void> {
    return this.http.post(`${environment.API_URL}/accounts`, register)
      .map(response => response.json())
      .catch(error => Observable.throw(error.json()));
  }

}
