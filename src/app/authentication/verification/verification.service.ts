import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Verification } from './verification.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class VerificationService {

  constructor(private http: HttpClient) { }

  sendCode(): Observable<any> {
    return this.http.get(`${environment.API_URL}/verify/send`);
  }

  verify(verification: Verification): Observable<any> {
    return this.http.post(`${environment.API_URL}/verify`, verification);
  }
}
