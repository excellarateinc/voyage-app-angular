import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ImageCropperModule } from 'ngx-img-cropper';
import { SharedModule } from '../shared/shared.module';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { ProfileImageComponent } from './profile-image/profile-image.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    FlexLayoutModule,
    ProfileRoutingModule,
    ImageCropperModule,
    SharedModule
  ],
  declarations: [
    ProfileComponent,
    ProfileImageComponent
  ],
  exports: [],
  providers: []
})
export class ProfileModule { }
