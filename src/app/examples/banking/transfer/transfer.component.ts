import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MdSnackBar } from '@angular/material';
import { AccountsService } from '../accounts.service';
import { Account } from '../account.model';
import { Transfer } from './transfer.model';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent implements OnInit {
  accounts: Array<Account>;
  transferForm: FormGroup;

  constructor(
    private accountsService: AccountsService,
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MdSnackBar) { }

  ngOnInit() {
    this.accountsService.getAllAccounts()
      .subscribe(result => this.accounts = result);

    this.initializeForm();
  }

  transfer(): void {
    if (this.transferForm.invalid) {
      return;
    }

    const transfer = this.transferForm.value as Transfer;
    this.accountsService.transfer(transfer)
      .subscribe(result => {
        this.snackBar.open('Transfer completed successfully', null, { duration: 5000 });
        this.router.navigate(['/examples/banking/dashboard']);
      }, error => {
        this.snackBar.open(error[0].errorDescription, null, { duration: 5000 });
      });
  }

  get myAccounts(): Array<Account> {
    if (this.accounts == null) {
      return null;
    }
    return this.accounts.filter(account => account.mine);
  }

  private initializeForm(): void {
    this.transferForm = this.formBuilder.group({
      fromAccountId: [null, Validators.required],
      toAccountId: [null, Validators.required],
      amount: [null, Validators.required],
      memo: ['']
    });
  }
}
