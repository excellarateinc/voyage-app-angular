import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { Account } from './account.model';
import { AccountType } from './account-type.enum';
import { Transaction } from './transaction.model';
import { TransactionType } from './transaction-type.enum';
import { TransactionHistory } from './transaction-history.model';

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

  getTransactionHistory(): Observable<TransactionHistory> {

    // TODO: Once API is built, uncomment this.
    // return this.http.get(`${environment.API_URL}/banking/transactions`)
    //   .map(response => response.json())
    //   .catch(error => Observable.throw(error.json()));

    const transactions: Array<Transaction> = [];
    transactions.push({
      accountId: 1,
      description: 'Check from **8088',
      amount: 12,
      balance: 2546,
      date: new Date('7/1/2017'),
      transactionId: 1,
      type: TransactionType.Deposit
    });
    transactions.push({
      accountId: 1,
      description: 'vanguard invest',
      amount: 500,
      balance: 1875,
      date: new Date('7/3/2017'),
      transactionId: 2,
      type: TransactionType.Withdrawal
    });

    const transactionHistory = new TransactionHistory();
    transactionHistory.accountId = 1;
    transactionHistory.accountName = 'Checking ****1234';
    transactionHistory.transactions = transactions;

    return Observable.create(observer => observer.next(transactionHistory));
  }

  transfer(transfer: any): Observable<any> {
    // TODO: Once API is built, uncomment this.
    // return this.http.post(`${environment.API_URL}/banking/accounts/transfers`, transfer)
    //   .map(response => response.json())
    //   .catch(error => Observable.throw(error.json()));
    return Observable.create(observer => observer.next({}));
  }

}
