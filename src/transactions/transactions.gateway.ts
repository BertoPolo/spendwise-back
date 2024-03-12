import { Injectable } from '@nestjs/common';
import {
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

  handleConnection(client: any) {
    this.sendTransactionsToClient(client);
  }

  async sendTransactionsToClient(client: any) {
    const transactions = await this.transactionsService.getTransactions();
    client.emit('transactions', transactions);
  }
}
