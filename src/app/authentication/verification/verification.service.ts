import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { Verification } from './verification.model';

@Injectable()
export class VerificationService {

  constructor(private http: Http) { }

  sendCode(): Observable<void> {
    return this.http.get(`${environment.API_URL}/verify/send`)
      .map(response => response)
      .catch(error => Observable.throw(error.json()));
  }

  verify(verification: Verification): Observable<void> {
    return this.http.post(`${environment.API_URL}/verify`, verification)
      .map(response => response)
      .catch(error => Observable.throw(error.json()));
  }
}
