import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { MdSnackBar } from '@angular/material';
import { RegisterService } from './register.service';
import { Register } from './register.model';
import { Phone } from '../../core/user/phone.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  registrationErrors: Array<any>;

  constructor(
    private formBuilder: FormBuilder,
    private registerService: RegisterService,
    private router: Router,
    private snackBar: MdSnackBar) { }

  ngOnInit() {
    this.initializeForm();
  }

  register(): void {
    if (this.registerForm.invalid) {
      return;
    }
    const register = this.registerForm.value as Register;
    this.registerService.register(register)
      .subscribe(result => {
        this.snackBar.open('Registration successful', null, {
          duration: 2000,
        });
        this.router.navigate(['/authentication/login']);
      }, errors => this.registrationErrors = errors);
  }

  get phoneNumbers(): FormArray {
    return this.registerForm.get('phoneNumbers') as FormArray;
  };

  private initializeForm(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      phoneNumbers: this.formBuilder.array([
        this.formBuilder.group({
          phoneNumber: ['', Validators.required],
          phoneType: [null, Validators.required]
        })
      ])
    });
  }
}
