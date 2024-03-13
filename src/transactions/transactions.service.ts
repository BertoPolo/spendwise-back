import { Injectable } from '@nestjs/common';
import { Transaction } from './entities/transactions.entity';
import { TransactionsRepository } from './repositories/transactions.repository';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionsRepository: TransactionsRepository,
    private readonly emailService: EmailService,
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

  async createTransaction(transaction: Transaction): Promise<Transaction> {
    return this.transactionsRepository.create(transaction);
  }

  async updateTransaction(
    id: string,
    transactionUpdate: Transaction,
  ): Promise<Transaction> {
    return this.transactionsRepository.update(id, transactionUpdate);
  }

  async deleteTransaction(id: string): Promise<void> {
    await this.transactionsRepository.delete(id);
  }

  async getTotal() {
    const transactions = await this.getTransactions();
    return transactions.reduce((acc, { amount }) => acc + amount, 0);
  }

  async checkAndNotifyNegativeBalance() {
    const transactions = await this.getTransactions();
    const totalBalance = transactions.reduce(
      (acc, transaction) => acc + transaction.amount,
      0,
    );

    if (totalBalance < 0) {
      this.emailService.sendNegativeBalanceEmail({
        from: { name: 'AppBot', address: 'bot@chargevite.com' },
        recipients: [{ name: 'Admin', address: 'admin@info.com' }],
        subject: 'Warning',
        html: '<p>Red numbers!</p>',
      });
    }
  }
}
