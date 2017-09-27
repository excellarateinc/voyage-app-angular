import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';
import { SecureHttpClient } from './secure-http-client';
import { AuthGuardService } from './auth-guard.service';
import { AuthenticationService } from './authentication.service';
import { RegisterComponent } from './register/register.component';
import { RegisterService } from './register/register.service';
import { VerificationComponent } from './verification/verification.component';
import { VerificationService } from './verification/verification.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    AuthenticationRoutingModule
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    VerificationComponent
  ],
  providers: [
    AuthenticationService,
    AuthGuardService,
    RegisterService,
    VerificationService,
    LoginService
  ]
})
export class AuthenticationModule { }
