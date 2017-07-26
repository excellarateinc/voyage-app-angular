import { Transaction } from './transaction.model';

export class TransactionHistory {
  accountId: number;
  accountName: string;
  transactions: Array<Transaction>;
}
