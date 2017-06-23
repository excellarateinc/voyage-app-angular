import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule, RequestOptions, Http, XHRBackend } from '@angular/http';
import { MaterialModule } from '@angular/material';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponent } from './login/login.component';
import { SecureHttpClient } from './secure-http-client';
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
    MaterialModule,
    AuthenticationRoutingModule
  ],
  declarations: [ LoginComponent, RegisterComponent ],
  providers: [
    AuthenticationService,
    { provide: Http, useFactory: secureHttpClientFactory, deps: [XHRBackend, RequestOptions, AuthenticationService] }
  ]
})
export class AuthenticationModule { }
