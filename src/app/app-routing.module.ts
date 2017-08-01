import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './authentication/auth-guard.service';

const appRoutes: Routes = [
  { path: '', redirectTo: '/examples/banking/dashboard', pathMatch: 'full' },
  { path: 'dashboard', loadChildren: 'app/dashboard/dashboard.module#DashboardModule', canLoad: [AuthGuardService] },
  { path: 'examples', loadChildren: 'app/examples/examples.module#ExamplesModule', canLoad: [AuthGuardService] }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes, { useHash: true })
  ],
  declarations: [],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
