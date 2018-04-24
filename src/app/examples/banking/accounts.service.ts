import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { Account } from './account.model';
import { Transaction } from './transaction.model';
import { Transfer } from './transfer/transfer.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AccountsService {

  constructor(private http: HttpClient) { }

  getAllAccounts(): Observable<Array<Account>> {
    return this.http.get<Array<Account>>(`${environment.API_URL}/banking/accounts`);
  }

  getAccounts(): Observable<Array<Account>> {
    return this.http.get<Array<Account>>(`${environment.API_URL}/banking/accounts/me`);
  }

  createAccount(account: Account): Observable<Account> {
    return this.http.post<Account>(`${environment.API_URL}/banking/accounts`, account);
  }

  getRecentTransactions(): Observable<Array<Transaction>> {
    return this.http.get<Array<Transaction>>(`${environment.API_URL}/banking/accounts/transactions`);
  }

  transfer(transfer: Transfer): Observable<any> {
    return this.http.post(`${environment.API_URL}/banking/accounts/transfers`, transfer);
  }
}
