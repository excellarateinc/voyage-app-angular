import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SamplePageComponent } from './sample-page/sample-page.component';

const exampleRoutes: Routes = [
  { path: 'samplepage', component: SamplePageComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(exampleRoutes)
  ],
  declarations: [],
  exports: [RouterModule]
})
export class ExamplesRoutingModule { }
