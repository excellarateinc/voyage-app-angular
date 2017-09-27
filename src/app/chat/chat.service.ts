import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { ChatChannel } from './chat-channel.model';
import { ChatMessage } from './chat-message.model';

@Injectable()
export class ChatService {

  constructor(private http: Http) { }

    getChannels(): Observable<Array<ChatChannel>> {
      return this.http.get(`${environment.API_URL}/chats/channels`)
        .map(response => response.json())
        .catch(error => Observable.throw(error.json()));
    }

    createChannel(): Observable<ChatChannel> {
      return this.http.post(`${environment.API_URL}/chats/channels`, { })
        .map(response => response.json())
        .catch(error => Observable.throw(error.json()));
    }

    getMessages(channelId: number): Observable<Array<ChatMessage>> {
      return this.http.get(`${environment.API_URL}/chats/channels/${channelId}/messages`)
        .map(response => response.json())
        .catch(error => Observable.throw(error.json()));
    }

    createMessage(channelId: number, message: string): Observable<ChatMessage> {
      return this.http.post(`${environment.API_URL}/chats/channels/${channelId}/messages`, { message })
        .map(response => response.json())
        .catch(error => Observable.throw(error.json()));
    }
}
