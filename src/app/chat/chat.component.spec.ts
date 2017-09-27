import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { ChatComponent } from './chat.component';
import { ChatService } from './chat.service';
import { UserService } from '../core/user/user.service';
import { Observable } from 'rxjs/Observable';
import { SignalR } from 'ng2-signalr';

describe('ChatComponent', () => {
  let component: ChatComponent;
  let fixture: ComponentFixture<ChatComponent>;
  let chatService: ChatService;
  let userService: UserService;
  let signalR: SignalR;

  beforeEach(async(() => {

    const chatServiceStub: any = { getChannels: () => { } };
    const userServiceStub: any = { getCurrentUser: () => { } };
    const signalRStub: any = { connect: () => { } };

    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MaterialModule,
        FlexLayoutModule,
        ReactiveFormsModule
      ],
      declarations: [ ChatComponent ],
      providers: [
        { provide: ChatService, useValue: chatServiceStub },
        { provide: UserService, useValue: userServiceStub },
        { provide: SignalR, useValue: signalRStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    chatService = TestBed.get(ChatService);
    userService = TestBed.get(UserService);
    signalR = TestBed.get(SignalR);

    spyOn(chatService, 'getChannels').and.callFake(() => new Observable(o => o.next()));
    spyOn(userService, 'getCurrentUser').and.callFake(() => new Observable(o => o.next()));
    spyOn(signalR, 'connect').and.callFake(() => Promise.resolve({ listenFor: () => new Observable(o => o.next()) }));

    fixture = TestBed.createComponent(ChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
    expect(chatService.getChannels).toHaveBeenCalled();
    expect(userService.getCurrentUser).toHaveBeenCalled();
    expect(signalR.connect).toHaveBeenCalled();
  });
});
