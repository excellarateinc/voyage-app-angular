import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { DepositComponent } from './deposit/deposit.component';

const exampleRoutes: Routes = [
  { path: 'examples/profile', component: ProfileComponent },
  { path: 'examples/deposit', component: DepositComponent }
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
