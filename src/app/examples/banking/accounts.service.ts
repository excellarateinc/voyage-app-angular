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

  getAccounts(): Observable<Array<Account>> {
    return this.http.get(`${environment.API_URL}/banking/accounts`)
      .map(response => response.json())
      .catch(error => Observable.throw(error.json()));
  }

  getTransactionHistory(): Observable<Array<TransactionHistory>> {

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
    },
    {
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

    const transactionHistory2 = new TransactionHistory();
    transactionHistory2.accountId = 2;
    transactionHistory2.accountName = 'Savings ****1234';
    transactionHistory2.transactions = transactions;

    return Observable.create(observer => observer.next([transactionHistory, transactionHistory2]));
  }

  transfer(transfer: Transfer): Observable<any> {
    return this.http.post(`${environment.API_URL}/banking/accounts/transfers`, transfer)
      .map(response => response)
      .catch(error => Observable.throw(error));
  }
}
