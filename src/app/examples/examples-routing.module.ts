import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { AccountsDashboardComponent } from './banking/accounts-dashboard/accounts-dashboard.component';
import { TransferComponent } from './banking/transfer/transfer.component';
import { CreateAccountComponent } from './banking/create-account/create-account.component';

const exampleRoutes: Routes = [
  { path: 'profile', component: ProfileComponent },
  { path: 'banking/dashboard', component: AccountsDashboardComponent },
  { path: 'banking/create-account', component: CreateAccountComponent },
  { path: 'banking/transfer', component: TransferComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(exampleRoutes)
  ],
  declarations: [],
  exports: [ RouterModule ]
})
export class ExamplesRoutingModule { }
