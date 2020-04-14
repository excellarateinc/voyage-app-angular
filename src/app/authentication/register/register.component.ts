import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RegisterService } from './register.service';
import { Register } from './register.model';
import { Subscription } from 'rxjs';
import { MobileService } from '../../core/mobile.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm: FormGroup;
  registrationErrors: Array<any>;
  isMobile = false;
  private watcher: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private registerService: RegisterService,
    private router: Router,
    private snackBar: MatSnackBar,
    private mobileService: MobileService) { }

  ngOnInit(): void {
    this.initializeForm();
    this.isMobile = this.mobileService.isMobile();
    this.watcher = this.mobileService.mobileChanged$.subscribe((isMobile: boolean) => {
      this.isMobile = isMobile;
    });
  }

  ngOnDestroy(): void {
    if (this.watcher && this.watcher.unsubscribe)
    {
      this.watcher.unsubscribe();
    }
  }

  register(): void {
    if (this.registerForm.invalid) {
      return;
    }
    const register = this.registerForm.value as Register;
    this.registerService.register(register)
      .subscribe(result => {
        this.snackBar.open('Registration successful', null, {
          duration: 2000
        });
        this.router.navigate(['/authentication/login']);
      }, errors => this.registrationErrors = errors);
  }

  get phones(): FormArray {
    return this.registerForm.get('phones') as FormArray;
  }

  private initializeForm(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      phones: this.formBuilder.array([
        this.formBuilder.group({
          phoneNumber: ['', Validators.required],
          phoneType: [null, Validators.required]
        })
      ])
    });
  }
}
