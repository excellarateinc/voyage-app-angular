import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ExampleDashboardComponent } from './example-dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule
  ],
  declarations: [ExampleDashboardComponent],
  exports: [ExampleDashboardComponent]
})
export class ExamplesModule { }
