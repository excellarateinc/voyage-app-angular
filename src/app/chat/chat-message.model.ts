export class ChatMessage {
  messageId: number;
  channelId: number;
  message: string;
  username: string;
  mine: boolean;
  createdBy: string;
  createDate: Date;
}
