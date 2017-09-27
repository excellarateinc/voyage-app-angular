import { ChatMessage } from './chat-message.model';

export class ChatChannel {
  channelId: number;
  name: string;
  createdBy: string;
  createDate: Date;
  messages: Array<ChatMessage>;
}
