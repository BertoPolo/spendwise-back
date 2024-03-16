import { Injectable } from '@nestjs/common';
import { Transaction } from './entities/transactions.entity';
import { TransactionsRepository } from './repositories/transactions.repository';
import { EmailService } from '../email/email.service';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { EmailQueueService } from '../queue/emailQueue.service';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionsRepository: TransactionsRepository,
    private readonly emailService: EmailService,
    private readonly emailQueueService: EmailQueueService,
  ) {}

  async getTransactions(): Promise<Transaction[]> {
    return this.transactionsRepository.findAll();
  }

  async getTransactionById(id: string): Promise<Transaction> {
    const transaction = await this.transactionsRepository.findOne(id);
    if (!transaction) {
      throw new Error('Transaction not found');
    }
    return transaction;
  }

  async createTransaction(
    createTransactionDto: CreateTransactionDto,
  ): Promise<Transaction> {
    const newTransaction = new Transaction();
    newTransaction.id = Math.random().toString(36).substring(2, 15);
    newTransaction.description = createTransactionDto.description;
    newTransaction.amount = createTransactionDto.amount;

    const createdTransaction =
      await this.transactionsRepository.create(newTransaction);
    await this.enqueueEmailIfNegativeBalance();
    return createdTransaction;
  }

  async updateTransaction(
    id: string,
    transactionUpdate: Transaction,
  ): Promise<Transaction> {
    const updatedTransaction = await this.transactionsRepository.update(
      id,
      transactionUpdate,
    );
    await this.enqueueEmailIfNegativeBalance();
    return updatedTransaction;
  }

  async deleteTransaction(id: string): Promise<void> {
    await this.transactionsRepository.delete(id);
    await this.enqueueEmailIfNegativeBalance();
  }

  async getTotal() {
    const transactions = await this.getTransactions();
    return transactions.reduce((acc, { amount }) => acc + amount, 0);
  }

  async enqueueEmailIfNegativeBalance() {
    const transactions = await this.getTransactions();
    const totalBalance = transactions.reduce(
      (acc, transaction) => acc + transaction.amount,
      0,
    );

    if (totalBalance < 0) {
      this.emailQueueService.addEmailJob({
        from: { name: 'AppBot', address: 'bot@chargevite.com' },
        recipients: [{ name: 'Admin', address: 'admin@info.com' }],
        subject: 'Warning',
        html: '<p>Red numbers!</p>',
      });
    }
  }
}
