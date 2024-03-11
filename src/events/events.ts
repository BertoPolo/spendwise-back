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

  async getTransactions() {
    const data = await fs.promises.readFile(this.dbPath, 'utf8');
    return JSON.parse(data);
  }

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log('This user just conected: ', socket.id);
      const getTotal = async () => {
        const transactions = await this.getTransactions();
        return transactions.reduce((acc, { amount }) => acc + amount, 0);
      };
    });
  }
  @SubscribeMessage('newTransaction')
  onNewTransaction(@MessageBody() body: any) {
    console.log(body);
  }
}
