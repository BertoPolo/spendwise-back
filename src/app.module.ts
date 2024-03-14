import { Module } from '@nestjs/common';
// import { BullModule } from '@nestjs/bullmq';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransactionsModule } from './transactions/transactions.module';
import { EmailModule } from './email/email.module';
// import { BullMQModule } from './bull/bull.module';

@Module({
  imports: [TransactionsModule, EmailModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
