import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { EmailModule } from '../email/email.module';
import { TransactionsRepository } from './repositories/transactions.repository';
import { TransactionsGateway } from './transactions.gateway';
import { EmailQueueService } from '../queue/emailQueue.service';
import { QueueModule } from '../queue/queue.module';

@Module({
  imports: [EmailModule, QueueModule],
  controllers: [TransactionsController],
  providers: [
    TransactionsService,
    TransactionsRepository,
    TransactionsGateway,
    EmailQueueService,
  ],
})
export class TransactionsModule {}
