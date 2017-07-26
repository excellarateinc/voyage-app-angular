import { TransactionType } from './transaction-type.enum';

export class Transaction {
  transactionId: number;
  accountId: number;
  date: Date;
  type: TransactionType;
  description: string;
  amount: number;
  balance: number;
}
