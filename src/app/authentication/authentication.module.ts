import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';
import { AuthGuardService } from './auth-guard.service';
import { AuthenticationService } from './authentication.service';
import { RegisterComponent } from './register/register.component';
import { RegisterService } from './register/register.service';
import { VerificationComponent } from './verification/verification.component';
import { VerificationService } from './verification/verification.service';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { PublicGuardService } from './public-guard.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
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
    PublicGuardService,
    RegisterService,
    VerificationService,
    LoginService
  ]
})
export class AuthenticationModule { }
