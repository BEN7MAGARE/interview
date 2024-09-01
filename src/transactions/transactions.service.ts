/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { DatabaseService } from '../database/database.service';
import { Transaction } from './entities/transaction.entity';

@Injectable()
export class TransactionsService {

  constructor(private readonly databaseService: DatabaseService) { }

  async create(createTransactionDto: CreateTransactionDto) {
    const transactionRepository = this.databaseService.getRepository(Transaction);
    const transaction = transactionRepository.create(createTransactionDto);
    return transactionRepository.save(transaction);
  }

  async findAll() {
    const transactionRepository = this.databaseService.getRepository(Transaction);
    return transactionRepository.find();
  }

  async findOne(id: number) {
    const transactionRepository = this.databaseService.getRepository(Transaction);
    return transactionRepository.findOneBy({ id });
  }

  async update(id: number, updateTransactionDto: UpdateTransactionDto) {
    const transactionRepository = this.databaseService.getRepository(Transaction);
    await transactionRepository.update(id, updateTransactionDto);
    return transactionRepository.findOneBy({ id });
  }

  async remove(id: number) {
    const transactionRepository = this.databaseService.getRepository(Transaction);
    await transactionRepository.delete(id);
    return { deleted: true }
  }
}
