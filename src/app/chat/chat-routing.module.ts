import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './chat.component';

const chatRoutes: Routes = [
  { path: '', component: ChatComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(chatRoutes)
  ],
  declarations: [],
  exports: [ RouterModule ]
})
export class ChatRoutingModule { }
