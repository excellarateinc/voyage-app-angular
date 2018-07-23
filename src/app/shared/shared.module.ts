import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileImageDirective } from './profile-image.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ProfileImageDirective],
  providers: [],
  exports: [ProfileImageDirective]
})
export class SharedModule { }
