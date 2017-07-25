import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { ExamplesRoutingModule } from './examples-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { AccountsDashboardComponent } from './banking/accounts-dashboard/accounts-dashboard.component';
import { TransferComponent } from './banking/transfer/transfer.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    ChartsModule,
    ExamplesRoutingModule
  ],
  declarations: [AccountsDashboardComponent, ProfileComponent, TransferComponent],
  exports: [AccountsDashboardComponent]
})
export class ExamplesModule { }
