import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { Transaction } from './entities/transactions.entity';
import { CreateTransactionDto } from 'src/dto/create-transaction.dto';

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
  createTransaction(
    @Body() createTransactionDto: CreateTransactionDto,
  ): Promise<Transaction> {
    return this.transactionsService.createTransaction(createTransactionDto);
  }

  @Put('/:id')
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
