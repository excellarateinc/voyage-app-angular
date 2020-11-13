import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { AuthGuardService } from './auth-guard.service';
import { AuthenticationService } from './authentication.service';
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
  declarations: [ ],
  providers: [
    AuthenticationService,
    AuthGuardService,
    PublicGuardService,
  ]
})
export class AuthenticationModule { }
