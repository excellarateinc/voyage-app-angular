import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponent } from './login/login.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    AuthenticationRoutingModule
  ],
  declarations: [ LoginComponent ],
  exports: [
    LoginComponent
  ]
})
export class AuthenticationModule { }
