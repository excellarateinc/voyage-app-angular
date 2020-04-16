import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './authentication/auth-guard.service';

const appRoutes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', loadChildren: () => import('app/dashboard/dashboard.module').then(m => m.DashboardModule), canLoad: [AuthGuardService] },
  { path: 'examples', loadChildren: () => import('app/examples/examples.module').then(m => m.ExamplesModule), canLoad: [AuthGuardService] },
  { path: 'admin', loadChildren: () => import('app/admin/admin.module').then(m => m.AdminModule), canLoad: [AuthGuardService] },
  { path: 'profile', loadChildren: () => import('app/profile/profile.module').then(m => m.ProfileModule), canLoad: [AuthGuardService] }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes, { useHash: true })
  ],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
