import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {AddMemberComponent} from "./add-member/add-member.component";
import {UpdateMemberComponent} from "./update-member/update-member.component";
import {MembersComponent} from "./members.component";
import {MembersService} from "./members.service";
import {DialogModule} from "@progress/kendo-angular-dialog";
import {GridModule} from "@progress/kendo-angular-grid";
import {ExcelExportModule} from "@progress/kendo-angular-excel-export";
import {MembersRoutingModule} from "./members-routing.module";
import {ButtonsModule} from "@progress/kendo-angular-buttons";
import {RandomStringService} from "../services/random-string.service";

@NgModule({
  imports: [
    CommonModule,
    DialogModule,
    FormsModule,
    ButtonsModule,
    ReactiveFormsModule,
    GridModule,
    ExcelExportModule,
    MembersRoutingModule,
  ],
  declarations: [
    AddMemberComponent,
    UpdateMemberComponent,
    MembersComponent
  ],
  providers: [
    MembersService,
    RandomStringService
  ]
})
export class MembersModule { }
