import { Module } from '@nestjs/common';
import { TransactionsService } from '../transactions/transactions.service';
import { TransactionsGateway } from '../transactions/transactions.gateway';
import { EmailService } from '../email/email.service';

@Module({
  providers: [TransactionsGateway, TransactionsService, EmailService],
})
export class EventsModule {}
