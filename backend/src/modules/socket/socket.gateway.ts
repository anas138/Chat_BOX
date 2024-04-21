import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SocketGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('typing')
  async typing(@MessageBody() data: any) {
    this.server.emit('show-typing', { ...data });
  }

  @SubscribeMessage('chat')
  async chatMessage(@MessageBody() data: any) {
    this.server.emit('message');
  }

  //@SubscribeMessage('group-notification')
  async groupNotification(data: any) {
    const message = `${data.joinUser.username} has joined the group`;
    this.server.emit('group-notification', { ...data, message });
  }
}
