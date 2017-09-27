import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ChatRoutingModule } from './chat-routing.module';
import { ChatService } from './chat.service';
import { ChatComponent } from './chat.component';
import { environment } from '../../environments/environment';
import { SignalRModule } from 'ng2-signalr';
import { SignalRConfiguration } from 'ng2-signalr';

export function getConfiguration(): SignalRConfiguration {
  const config = new SignalRConfiguration();
  config.hubName = 'chatHub';
  config.url = environment.SIGNALR_URL;
  config.qs = { access_token: sessionStorage.getItem('voyage.token') };
  return config;
}

@NgModule({
  imports: [
    CommonModule,
    ChatRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    SignalRModule.forRoot(getConfiguration)
  ],
  declarations: [ChatComponent],
  providers: [ ChatService ]
})
export class ChatModule { }
