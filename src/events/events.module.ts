import { Module } from '@nestjs/common';
import { TransactionsService } from '../transactions/transactions.service';
import { TransactionsGateway } from '../transactions/transactions.gateway';

@Module({
  providers: [TransactionsGateway, TransactionsService],
})
export class EventsModule {}
