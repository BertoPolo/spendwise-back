import { Module } from '@nestjs/common';
import {
  TransactionsController,
  AppController,
} from './transactions.controller';
import { TransactionsService } from './transactions.service';

@Module({
  controllers: [TransactionsController, AppController],
  providers: [TransactionsService],
})
export class TransactionsModule {}
