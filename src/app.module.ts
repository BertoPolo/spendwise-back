import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransactionsModule } from './transactions/transactions.module';
import { EmailModule } from './email/email.module';
import { EventsModule } from './events/events.module';

@Module({
  imports: [TransactionsModule, EmailModule, EventsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
