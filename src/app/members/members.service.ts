import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment as envVariables } from '../../environments/environment'

@Injectable()
export class MembersService {

  public headers = new HttpHeaders().set('Access-Control-Allow-Origin', 'true');

  constructor(private http: HttpClient) {
  }

  getMembersList() {
    return this.http.get(`${envVariables.API_NODE}/api/subscribers/list`).toPromise();
  }

  addMember(member) {
    return this.http.post(`${envVariables.API_NODE}/api/subscribers`, member).toPromise();
  }

  updateMember(member) {
    return this.http.put(`${envVariables.API_NODE}/api/subscribers`, member).toPromise();
  }

  removeMember(subscriber_id) {
    return this.http.delete(`${envVariables.API_NODE}/api/subscribers/${subscriber_id}`).toPromise();
  }

  parse
}
