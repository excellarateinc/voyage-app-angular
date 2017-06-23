import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

// TODO: Need to come up with a modular route guard strategy.
import { AuthenticationModule } from '../authentication/authentication.module';
import { AuthGuardService } from '../authentication/auth-guard.service';

const dashboardRoutes: Routes = [
  { path: '**', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService] }
];

@NgModule({
  imports: [
    CommonModule,
    AuthenticationModule,
    RouterModule.forChild(dashboardRoutes)
  ],
  declarations: []
})
export class DashboardRoutingModule { }
