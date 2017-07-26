import { Component, OnInit } from '@angular/core';
import { AccountsService } from '../accounts.service';
import { Account } from '../account.model';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html'
})
export class TransferComponent implements OnInit {
  accounts: Array<Account>;

  constructor(private accountsService: AccountsService) { }

  ngOnInit() {
    this.accountsService.getAccounts()
      .subscribe(result => this.accounts = result);
  }

}
