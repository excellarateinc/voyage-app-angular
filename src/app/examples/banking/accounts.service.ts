import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { Account } from './account.model';
import { AccountType } from './account-type.enum';
import { Transaction } from './transaction.model';
import { TransactionType } from './transaction-type.enum';
import { TransactionHistory } from './transaction-history.model';
import { Transfer } from './transfer/transfer.model';

@Injectable()
export class AccountsService {

  constructor(private http: Http) { }

  getAllAccounts(): Observable<Array<Account>> {
    return this.http.get(`${environment.API_URL}/banking/accounts`)
      .map(response => response.json())
      .catch(error => Observable.throw(error.json()));
  }

  getAccounts(): Observable<Array<Account>> {
    return this.http.get(`${environment.API_URL}/banking/accounts/me`)
      .map(response => response.json())
      .catch(error => Observable.throw(error.json()));
  }

  createAccount(account: Account): Observable<Account> {
    return this.http.post(`${environment.API_URL}/banking/accounts`, account)
      .map(response => response.json())
      .catch(error => Observable.throw(error.json()));
  }

  getRecentTransactions(): Observable<Array<Transaction>> {
    return this.http.get(`${environment.API_URL}/banking/accounts/transactions`)
      .map(response => response.json())
      .catch(error => Observable.throw(error.json()));
  }

  transfer(transfer: Transfer): Observable<any> {
    return this.http.post(`${environment.API_URL}/banking/accounts/transfers`, transfer)
      .map(response => response)
      .catch(error => Observable.throw(error.json()));
  }
}
