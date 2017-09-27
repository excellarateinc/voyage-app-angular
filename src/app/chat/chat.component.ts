import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewChecked } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';
import { MdSidenav } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import { SignalR } from 'ng2-signalr';
import { ChatService } from './chat.service';
import { ChatChannel } from './chat-channel.model';
import { ChatMessage } from './chat-message.model';
import { UserService } from '../core/user/user.service';
import { User } from '../core/user/user.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy, AfterViewChecked {
  channels: Array<ChatChannel>;
  currentChannel: ChatChannel;
  chatForm: FormGroup;
  isMobile: boolean;
  @ViewChild('sidenav') sidenav: MdSidenav;
  @ViewChild('chatContainer') private myScrollContainer: ElementRef;
  private readonly chatMessage = 'newChatMessage';
  private watcher: Subscription;
  currentUser: User;
  working = false;

  constructor(
    private chatService: ChatService,
    private signalR: SignalR,
    private fb: FormBuilder,
    private media: ObservableMedia,
    private userService: UserService) { }

  ngOnInit() {
    this.chatService.getChannels()
      .subscribe(result => this.channels = result);

    this.userService.getCurrentUser()
      .subscribe(result => this.currentUser = result);

    this.initializeForm();
    this.listenForPushNotifications();
    this.isMobile = this.media.isActive('xs') || this.media.isActive('sm');
    this.watcher = this.media.subscribe((change: MediaChange) => {
      this.isMobile = change.mqAlias === 'xs' || change.mqAlias === 'sm';
    });
  }

  ngOnDestroy() {
    this.watcher.unsubscribe();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  createChannel(): void {
    this.chatService.createChannel()
      .subscribe(result => {
        this.currentChannel = result;
        this.currentChannel.messages = [];
        this.channels.unshift(this.currentChannel);
      });
    this.closeSidenav();
  }

  selectChannel(channel: ChatChannel): void {
    this.currentChannel = channel;
    this.working = true;
    this.chatService.getMessages(channel.channelId)
      .subscribe(result => {
        this.currentChannel.messages = result;
        this.working = false;
      });
    this.closeSidenav();
  }

  createMessage(): void {
    if (this.chatForm.invalid) {
      return;
    }
    const message = this.chatForm.value.message as string;
    if (message == null || message.trim() === '') {
      return;
    }
    this.chatService.createMessage(this.currentChannel.channelId, message)
      .subscribe(result => {
        this.currentChannel.messages.push(result);
        this.scrollToBottom();
        this.chatForm.reset();
      });
  }

  toggleSidenav(): void {
    this.sidenav.toggle();
  }

  private closeSidenav(): void {
    if (!this.isMobile) {
      return;
    }
    this.sidenav.close();
  }

  private initializeForm(): void {
    this.chatForm = this.fb.group({
      message: ['']
    });
  }

  private listenForPushNotifications(): void {
    this.signalR.connect().then(connection => {
      connection.listenFor(this.chatMessage)
        .subscribe((message: ChatMessage) => {
          this.onPushReceived(message);
      });
    });
  }

  private onPushReceived(message: ChatMessage): void {
    const channels = this.channels.filter(channel => channel.channelId === message.channelId);

    if (channels.length) {
      const channel = channels[0];
      if (!channel.messages) {
        channel.messages = [];
      }
      channel.messages.push(message);
      if (this.currentChannel && this.currentChannel.channelId === channel.channelId) {
        this.scrollToBottom();
      }
    } else {
      this.chatService.getChannels()
        .subscribe(result => this.channels = result);
    }
  }

  private scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }
}
