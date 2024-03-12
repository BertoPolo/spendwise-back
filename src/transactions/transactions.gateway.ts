import { Injectable } from '@nestjs/common';
import {
  SubscribeMessage,
  MessageBody,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
} from '@nestjs/websockets';

import { Server } from 'socket.io';
import { TransactionsService } from './transactions.service';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:5173',
  },
})
@Injectable()
export class TransactionsGateway implements OnGatewayConnection {
  @WebSocketServer() server: Server;

  constructor(private transactionsService: TransactionsService) {}

  async sendTransactionsToAllClients() {
    const transactions = await this.transactionsService.getTransactions();
    this.server.emit('transactions', transactions);
  }

  handleConnection() {
    this.sendTransactionsToAllClients();
  }

  // @SubscribeMessage('transactions')
  // async handleTransactions(@MessageBody() transactionData: any) {
  //   this.sendTransactionsToAllClients();
  // }
  @SubscribeMessage('transactions')
  async handleTransactions() {
    this.sendTransactionsToAllClients();
  }
}
