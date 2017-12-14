import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {MembersComponent} from "./members.component";
import {AuthGuardService} from "../authentication/auth-guard.service";
import {AuthenticationModule} from "../authentication/authentication.module";

const membersRoutes: Routes = [
  { path: '', component: MembersComponent, canActivate: [AuthGuardService] }
];

@NgModule({
  imports: [
    CommonModule,
    AuthenticationModule,
    RouterModule.forChild(membersRoutes)
  ],
  declarations: []
})
export class MembersRoutingModule { }
