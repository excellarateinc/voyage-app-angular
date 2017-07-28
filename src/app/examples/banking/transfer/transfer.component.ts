import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountsService } from '../accounts.service';
import { Account } from '../account.model';
import { Transfer } from './transfer.model';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html'
})
export class TransferComponent implements OnInit {
  accounts: Array<Account>;
  transferForm: FormGroup;

  constructor(private accountsService: AccountsService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.accountsService.getAccounts()
      .subscribe(result => this.accounts = result);

    this.initializeForm();
  }

  transfer(): void {
    if (this.transferForm.invalid) {
      return;
    }

    const transfer = this.transferForm.value as Transfer;
    this.accountsService.transfer(transfer)
      .subscribe(result => { });
  }

  private initializeForm(): void {
    this.transferForm = this.formBuilder.group({
      fromAccountId: ['', Validators.required],
      toAccountId: ['', Validators.required],
      amount: ['', Validators.required],
      memo: ['']
    });
  }

}
