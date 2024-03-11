import { Injectable } from '@nestjs/common';
import { Transaction } from './transactions.interface';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class TransactionsService {
  private transactionsFile = path.join(
    __dirname,
    '../../data/transactions.json',
  );

  findAll(): Transaction[] {
    const transactions = JSON.parse(
      fs.readFileSync(this.transactionsFile, 'utf8'),
    );
    return transactions;
  }

  async create(transaction: Transaction): Promise<Transaction> {
    const transactions = await this.findAll();
    transaction.id = this.generateUniqueId();
    transactions.push(transaction);
    fs.writeFileSync(
      this.transactionsFile,
      JSON.stringify(transactions, null, 2),
      'utf8',
    );
    return transaction;
  }

  private generateUniqueId(): string {
    return Math.random().toString(36).substring(2, 15);
  }

  async update(
    id: string,
    updatedTransaction: Transaction,
  ): Promise<Transaction> {
    let transactions = await this.findAll();
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

  async delete(id: string): Promise<{ deleted: boolean; id: string }> {
    let transactions = await this.findAll();
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
}
