import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { ExampleDashboardComponent } from './example-dashboard/example-dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    ChartsModule
  ],
  declarations: [ExampleDashboardComponent],
  exports: [ExampleDashboardComponent]
})
export class ExamplesModule { }
