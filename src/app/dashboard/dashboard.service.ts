import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment as envVariables } from './../../environments/environment';

@Injectable()
export class DashboardService {

  constructor(private http: HttpClient) {
  }

  public getBooksByAuthor () {
    return this.http.get(`${envVariables.API_URL}/api/dashboard/booksByAuthor`).toPromise();
  }

  public getBooksByCategory() {
    return this.http.get(`${envVariables.API_URL}/api/dashboard/booksByCategory`).toPromise();
  }

  async getTopSubscriptions() {
    return this.http.get(`${envVariables.API_URL}/api/dashboard/topSubscriptions`).toPromise();
  }

}
