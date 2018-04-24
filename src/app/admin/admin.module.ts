import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AdminRoutingModule } from './admin-routing.module';
import { UserAdminComponent } from './user-admin/user-admin.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    AngularMaterialModule,
    FlexLayoutModule,
    FormsModule
  ],
  declarations: [UserAdminComponent]
})
export class AdminModule { }
