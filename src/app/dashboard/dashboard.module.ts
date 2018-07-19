import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ExamplesModule } from '../examples/examples.module';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    AngularMaterialModule,
    ExamplesModule,
    FlexLayoutModule
  ],
  declarations: [DashboardComponent]
})
export class DashboardModule { }
