import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { ExamplesRoutingModule } from './examples-routing.module';
import { ImageCropperModule } from 'ng2-img-cropper';
import { SharedModule } from '../shared/shared.module';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { GraphComponent } from './graph/graph.component';
import { SamplePageComponent } from './sample-page/sample-page.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    FlexLayoutModule,
    ChartsModule,
    ExamplesRoutingModule,
    ImageCropperModule,
    SharedModule,
  ],
  declarations: [
    GraphComponent,
    SamplePageComponent,
  ],
  exports: [GraphComponent],
})
export class ExamplesModule { }
