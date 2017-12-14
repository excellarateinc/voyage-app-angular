import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ExamplesModule } from '../examples/examples.module';
import { DashboardService } from "./dashboard.service";
import { PieChartComponent } from "../charts/pie-chart/pie-chart.component";
import { DonutChartComponent } from "../charts/donut-chart/donut-chart.component";
import { ChartsModule } from '@progress/kendo-angular-charts';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    DashboardRoutingModule,
    ExamplesModule,
    ChartsModule,
  ],
  declarations: [DashboardComponent, PieChartComponent, DonutChartComponent],
  providers: [DashboardService]
})
export class DashboardModule { }
