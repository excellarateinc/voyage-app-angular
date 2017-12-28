import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { Verification } from './verification.model';

@Injectable()
export class VerificationService {

  constructor(private http: HttpClient) { }

  sendCode(): Observable<void> {
    return this.http.get<void>(`${environment.API_URL}/verify/send`);
  }

  verify(verification: Verification): Observable<void> {
    return this.http.post<void>(`${environment.API_URL}/verify`, verification);
  }
}
