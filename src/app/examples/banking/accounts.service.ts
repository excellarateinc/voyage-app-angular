import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { Account } from './account.model';
import { AccountType } from './account-type.enum';

@Injectable()
export class AccountsService {

  constructor(private http: Http) { }

  getAccounts(): Observable<Array<Account>> {

    // TODO: Once API is built, uncomment this.
    // return this.http.get(`${environment.API_URL}/banking/accounts`)
    //   .map(response => response.json())
    //   .catch(error => Observable.throw(error.json()));
    const accounts: Array<Account> = [];
    accounts.push({
      accountId: 1,
      accountNumber: '*****0548',
      name: 'My Checking',
      type: AccountType.Checking,
      balance: 1100
    });
    accounts.push({
      accountId: 2,
      accountNumber: '*****6824',
      name: 'My Savings',
      type: AccountType.Savings,
      balance: 4875
    });
    return Observable.create(observer => observer.next(accounts));
  }

  transfer(transfer: any): Observable<any> {
    // TODO: Once API is built, uncomment this.
    // return this.http.post(`${environment.API_URL}/banking/accounts/transfers`, transfer)
    //   .map(response => response.json())
    //   .catch(error => Observable.throw(error.json()));
    return Observable.create(observer => observer.next({}));
  }

}
