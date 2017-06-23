import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { ExampleDashboardComponent } from './example-dashboard.component';
import { HsaBalancesComponent } from './hsa-balances/hsa-balances.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [ExampleDashboardComponent, HsaBalancesComponent],
  exports: [ExampleDashboardComponent]
})
export class ExamplesModule { }
