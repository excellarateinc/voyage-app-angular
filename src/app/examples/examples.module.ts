import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { ExamplesRoutingModule } from './examples-routing.module';
import { ImageCropperModule } from 'ng2-img-cropper';
import { SharedModule } from '../shared/shared.module';
import { ProfileComponent } from './profile/profile.component';
import { AccountsDashboardComponent } from './banking/accounts-dashboard/accounts-dashboard.component';
import { TransferComponent } from './banking/transfer/transfer.component';
import { AccountsService } from './banking/accounts.service';
import { CreateAccountComponent } from './banking/create-account/create-account.component';
import { ProfileImageComponent } from './profile/profile-image/profile-image.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    FlexLayoutModule,
    ChartsModule,
    ExamplesRoutingModule,
    ImageCropperModule,
    SharedModule
  ],
  declarations: [
    AccountsDashboardComponent,
    ProfileComponent,
    TransferComponent,
    CreateAccountComponent,
    ProfileImageComponent
  ],
  exports: [ AccountsDashboardComponent ],
  providers: [ AccountsService ]
})
export class ExamplesModule { }
