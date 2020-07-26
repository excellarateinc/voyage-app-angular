import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AppAuthGuard } from './app.authguard';

const appRoutes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard',
    loadChildren: () =>  import('app/dashboard/dashboard.module').then(m => m.DashboardModule), canLoad: [AppAuthGuard]  },
  { path: 'examples', loadChildren: () => import('app/examples/examples.module').then(m => m.ExamplesModule), canLoad: [AppAuthGuard] },
  { path: 'admin', loadChildren: () => import('app/admin/admin.module').then(m => m.AdminModule), canLoad: [AppAuthGuard] },
  { path: 'profile', loadChildren: () => import('app/profile/profile.module').then(m => m.ProfileModule), canLoad: [AppAuthGuard] }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes, { useHash: true })
  ],
  declarations: [],
  exports: [RouterModule],
  providers: [AppAuthGuard]
})
export class AppRoutingModule { }
