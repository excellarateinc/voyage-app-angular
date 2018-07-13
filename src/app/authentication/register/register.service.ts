import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Register } from './register.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RegisterService {

  constructor(private http: HttpClient) { }

  register(register: Register): Observable<any> {
    return this.http.post(`${environment.API_URL}/profiles/register`, register);
  }

}
