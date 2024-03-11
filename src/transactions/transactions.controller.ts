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
import { emailQueue } from '../email/email.queue';

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
  update(@Param('id') id: string, @Body() transactionData: Transaction) {
    return this.transactionsService.update(id, transactionData);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.transactionsService.delete(id);
  }
}
@Controller()
export class AppController {
  @Post('/send-email-test')
  async sendEmailTest() {
    await emailQueue.add('sendEmail', {
      email: 'satiscopolo@gmail.com',
      subject: 'Prueba de BullMQ y Nodemailer',
      message: 'Si recibes esto, ¡la configuración funciona correctamente!',
    });

    return { message: 'Trabajo de envío de email encolado' };
  }
}
