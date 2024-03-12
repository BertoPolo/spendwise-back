import { OnModuleInit } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class MyEvents implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log('This user just conected: ', socket.id);
    });
  }
  @SubscribeMessage('newTransaction')
  onNewTransaction(@MessageBody() body: any) {
    console.log(body);
  }
}
