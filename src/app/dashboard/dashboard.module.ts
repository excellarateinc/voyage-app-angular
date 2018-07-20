import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ExamplesModule } from '../examples/examples.module';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ExamplesModule,
  ],
  declarations: [DashboardComponent],
})
export class DashboardModule { }
