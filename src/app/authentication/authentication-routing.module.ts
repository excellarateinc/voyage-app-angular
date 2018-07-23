import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { VerificationComponent } from './verification/verification.component';
import { PublicGuardService } from './public-guard.service';

const authRoutes: Routes = [
  { path: 'authentication/login', component: LoginComponent, canActivate: [PublicGuardService] },
  { path: 'authentication/register', component: RegisterComponent, canActivate: [PublicGuardService] },
  { path: 'authentication/verification', component: VerificationComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(authRoutes)
  ],
  declarations: [],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
