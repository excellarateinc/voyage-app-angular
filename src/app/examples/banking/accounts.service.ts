import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  constructor(private http: HttpClient) { }

  getAllAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(`${environment.API_URL}/banking/accounts`);
  }

  getAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(`${environment.API_URL}/banking/accounts/me`);
  }

  createAccount(account: Account): Observable<Account> {
    return this.http.post<Account>(`${environment.API_URL}/banking/accounts`, account);
  }

  getRecentTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${environment.API_URL}/banking/accounts/transactions`);
  }

  transfer(transfer: Transfer): Observable<any> {
    return this.http.post(`${environment.API_URL}/banking/accounts/transfers`, transfer);
  }
}
