import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule, RequestOptions, Http, XHRBackend } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponent } from './login/login.component';
import { SecureHttpClient } from './secure-http-client';
import { AuthGuardService } from './auth-guard.service';
import { AuthenticationService } from './authentication.service';
import { RegisterComponent } from './register/register.component';

export function secureHttpClientFactory(
  xhrBackend: XHRBackend,
  requestOptions: RequestOptions,
  authenticationService: AuthenticationService): Http {
    return new SecureHttpClient(xhrBackend, requestOptions, authenticationService);
  }

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    AuthenticationRoutingModule
  ],
  declarations: [ LoginComponent, RegisterComponent ],
  providers: [
    AuthenticationService,
    { provide: Http, useFactory: secureHttpClientFactory, deps: [XHRBackend, RequestOptions, AuthenticationService] },
    AuthGuardService
  ]
})
export class AuthenticationModule { }
