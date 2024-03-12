import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

import { Transaction } from './transactions.interface';
import { EmailService } from '../email/email.service';

@Injectable()
export class TransactionsService {
  constructor(private emailService: EmailService) {}

  private transactionsFile = path.join(
    __dirname,
    '../../data/transactions.json',
  );

  // should i delete this function and only use getTransactions?
  findAll(): Transaction[] {
    const transactions = JSON.parse(
      fs.readFileSync(this.transactionsFile, 'utf8'),
    );
    return transactions;
  }

  async getTransactions(): Promise<Transaction[]> {
    try {
      const data = await fs.promises.readFile(this.transactionsFile, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading transactions file:', error);
      throw new Error('Failed to read transactions');
    }
  }

  async create(transaction: Transaction): Promise<Transaction> {
    const transactions = await this.getTransactions();
    transaction.id = this.generateUniqueId();
    transactions.push(transaction);
    await fs.promises.writeFile(
      this.transactionsFile,
      JSON.stringify(transactions, null, 2),
      'utf8',
    );
    await this.checkAndNotifyNegativeBalance();
    return transaction;
  }

  private generateUniqueId(): string {
    return Math.random().toString(36).substring(2, 15);
  }

  //modify update and delete functions
  async update(
    id: string,
    updatedTransaction: Transaction,
  ): Promise<Transaction> {
    let transactions = this.findAll();
    transactions = transactions.map((t) =>
      t.id === id ? { ...t, ...updatedTransaction } : t,
    );
    fs.writeFileSync(
      this.transactionsFile,
      JSON.stringify(transactions, null, 2),
      'utf8',
    );
    return transactions.find((t) => t.id === id);
  }
  //modify update and delete functions
  async delete(id: string): Promise<{ deleted: boolean; id: string }> {
    let transactions = this.findAll(); // why do not await?
    const initialLength = transactions.length;
    transactions = transactions.filter((t) => t.id !== id);
    const wasDeleted = initialLength > transactions.length;
    fs.writeFileSync(
      this.transactionsFile,
      JSON.stringify(transactions, null, 2),
      'utf8',
    );
    return { deleted: wasDeleted, id };
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
