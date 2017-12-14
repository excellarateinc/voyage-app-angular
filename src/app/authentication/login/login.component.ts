import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { LoginService } from './login.service';
import { Login } from './login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  loginFailed = false;
  isMobile = false;
  private watcher: Subscription;

  constructor(
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private media: ObservableMedia,
    @Inject('Window') private window: any) { }

  ngOnInit() {
    this.initializeForm();
    this.isMobile = this.media.isActive('xs') || this.media.isActive('sm');
    this.watcher = this.media.subscribe((change: MediaChange) => {
      this.isMobile = change.mqAlias === 'xs' || change.mqAlias === 'sm';
    });
  }

  ngOnDestroy() {
    this.watcher.unsubscribe();
  }

  login(): void {
    if (this.loginForm.invalid) {
      return;
    }
    const login = this.loginForm.value as Login;
    this.loginService.login(login)
      .subscribe(result => {
        this.window.location.href = '/';
      }, error => this.loginFailed = true);
  }

  private initializeForm(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
}
