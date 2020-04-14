import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LoginService } from './login.service';
import { Login } from './login.model';
import { MobileService } from '../../core/mobile.service';

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
    @Inject('Window') private window: any,
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

  login(): void {
    if (this.loginForm.invalid) {
      return;
    }
    const login = this.loginForm.value as Login;
    this.loginService.login(login)
      .subscribe(result => {
        this.window.location.reload();
      }, error => this.loginFailed = true);
  }

  private initializeForm(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
}
