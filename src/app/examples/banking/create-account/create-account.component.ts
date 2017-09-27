import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MdSnackBar } from '@angular/material';
import { AccountsService } from '../accounts.service';
import { Account } from '../account.model';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {
  accountForm: FormGroup;

  constructor(
    private accountsService: AccountsService,
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MdSnackBar) { }

  ngOnInit() {
    this.initializeForm();
  }

  createAccount(): void {
    if (this.accountForm.invalid) {
      return;
    }

    const account = this.accountForm.value as Account;
    this.accountsService.createAccount(account)
      .subscribe(result => {
        this.snackBar.open(`${result.name} created successfully`, null, { duration: 5000 });
        this.router.navigate(['/examples/banking/dashboard']);
      }, error => {
        this.snackBar.open(error[0].errorDescription, null, { duration: 5000 });
      });
  }

  private initializeForm(): void {
    this.accountForm = this.formBuilder.group({
      type: [null, Validators.required],
      name: [null, Validators.required]
    });
  }
}
