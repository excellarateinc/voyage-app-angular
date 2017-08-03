import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MdSnackBar } from '@angular/material';
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

  constructor(
    private accountsService: AccountsService,
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MdSnackBar) { }

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
      .subscribe(result => {
        this.snackBar.open('Transfer completed', null, {
          duration: 2000,
        });
        this.router.navigate(['/examples/banking/dashboard']);
      }, (error) => {
        this.snackBar.open(error[0].errorDescription, null, {
          duration: 2000,
        });
      });
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
