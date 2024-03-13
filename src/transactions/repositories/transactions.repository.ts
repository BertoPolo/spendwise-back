import { Injectable } from '@nestjs/common';
import { Transaction } from '../entities/transactions.entity';
import * as fs from 'fs/promises';
import * as path from 'path';

@Injectable()
export class TransactionsRepository {
  private readonly dbPath = path.join(
    __dirname,
    '../../../data/transactions.json',
  );

  async findAll(): Promise<Transaction[]> {
    try {
      const data = await fs.readFile(this.dbPath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Failed to read transactions:', error);
      throw new Error('Failed to fetch transactions');
    }
  }

  async findOne(id: string): Promise<Transaction | undefined> {
    const transactions = await this.findAll();
    return transactions.find((transaction) => transaction.id === id);
  }

  async create(transaction: Transaction): Promise<Transaction> {
    const transactions = await this.findAll();
    transactions.push(transaction);
    await fs.writeFile(
      this.dbPath,
      JSON.stringify(transactions, null, 2),
      'utf8',
    );
    // await this.checkAndNotifyNegativeBalance();
    return transaction;
  }

  async update(
    id: string,
    transactionUpdate: Transaction,
  ): Promise<Transaction> {
    const transactions = await this.findAll();
    const transactionIndex = transactions.findIndex(
      (transaction) => transaction.id === id,
    );
    if (transactionIndex === -1) throw new Error('Transaction not found');

    const updatedTransaction = {
      ...transactions[transactionIndex],
      ...transactionUpdate,
    };
    transactions[transactionIndex] = updatedTransaction;

    await fs.writeFile(
      this.dbPath,
      JSON.stringify(transactions, null, 2),
      'utf8',
    );
    return updatedTransaction;
  }

  async delete(id: string): Promise<void> {
    let transactions = await this.findAll();
    transactions = transactions.filter((transaction) => transaction.id !== id);
    await fs.writeFile(
      this.dbPath,
      JSON.stringify(transactions, null, 2),
      'utf8',
    );
  }
}
