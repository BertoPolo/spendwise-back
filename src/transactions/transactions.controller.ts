import {
  Controller,
  Post,
  Body,
  Delete,
  Param,
  Get,
  Put,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { Transaction } from './transactions.interface';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get()
  getAll() {
    return this.transactionsService.findAll();
  }

  @Post()
  create(@Body() transactionData: Transaction) {
    return this.transactionsService.create(transactionData);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() transactionData: any) {
    return this.transactionsService.update(id, transactionData);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.transactionsService.delete(id);
  }
}
