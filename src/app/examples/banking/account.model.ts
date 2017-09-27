import { AccountType } from './account-type.enum';

export class Account {
  accountId: number;
  accountNumber: string;
  name: string;
  type: AccountType;
  balance: number;
  mine: boolean;
}
