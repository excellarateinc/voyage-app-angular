import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AppAuthGuard } from 'app/app.authguard';

const dashboardRoutes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AppAuthGuard] }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(dashboardRoutes)
  ],
  declarations: []
})
export class DashboardRoutingModule { }
