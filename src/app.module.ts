import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransactionsModule } from './transactions/transactions.module';
import { EmailModule } from './email/email.module';
import { QueueModule } from './queue/queue.module';

@Module({
  imports: [TransactionsModule, EmailModule, QueueModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
