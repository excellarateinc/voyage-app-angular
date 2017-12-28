import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { Register } from './register.model';

@Injectable()
export class RegisterService {

  constructor(private http: HttpClient) { }

  register(register: Register): Observable<void> {
    return this.http.post<void>(`${environment.API_URL}/accounts`, register);
  }

}
