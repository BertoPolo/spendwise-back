import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { Transaction } from './entities/transactions.entity';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get()
  getAllTransactions(): Promise<Transaction[]> {
    return this.transactionsService.getTransactions();
  }

  @Get('/:id')
  getTransactionById(@Param('id') id: string): Promise<Transaction> {
    return this.transactionsService.getTransactionById(id);
  }

  @Post()
  createTransaction(@Body() transaction: Transaction): Promise<Transaction> {
    return this.transactionsService.createTransaction(transaction);
  }

  @Patch('/:id')
  updateTransaction(
    @Param('id') id: string,
    @Body() transaction: Transaction,
  ): Promise<Transaction> {
    return this.transactionsService.updateTransaction(id, transaction);
  }

  @Delete('/:id')
  deleteTransaction(@Param('id') id: string): Promise<void> {
    return this.transactionsService.deleteTransaction(id);
  }
}
