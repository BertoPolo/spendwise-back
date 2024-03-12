import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class TransactionsService {
  private readonly dbPath = path.join(
    __dirname,
    '..',
    'data',
    'transactions.json',
  );

  async getTransactions() {
    const data = await fs.promises.readFile(this.dbPath, 'utf8');
    return JSON.parse(data);
  }

  async getTotal() {
    const transactions = await this.getTransactions();
    return transactions.reduce((acc, { amount }) => acc + amount, 0);
  }
}
