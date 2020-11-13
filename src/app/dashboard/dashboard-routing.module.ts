import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AuthGuardService } from 'app/authentication/auth-guard.service';

const dashboardRoutes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AuthGuardService] }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(dashboardRoutes)
  ],
  declarations: []
})
export class DashboardRoutingModule { }
