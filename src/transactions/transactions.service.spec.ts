/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsService } from './transactions.service';
import { DatabaseService } from '../database/database.service';
import { Transaction } from './entities/transaction.entity';
import { Repository } from 'typeorm';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

describe('UsersService', () => {
  let service: TransactionsService;
  let databaseService: DatabaseService;
  let transactionRepository: Repository<Transaction>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionsService,
        {
          provide: DatabaseService,
          useValue: {
            getRepository: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TransactionsService>(TransactionsService);
    databaseService = module.get<DatabaseService>(DatabaseService);

    // Use an explicit type cast to inform TypeScript about the type.
    transactionRepository = {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      findOneBy: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    } as unknown as Repository<Transaction>;

    // Ensure the mocked `getRepository` returns the `userRepository`
    jest.spyOn(databaseService, 'getRepository').mockReturnValue(transactionRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and save a user', async () => {
      const createWalletDto: CreateTransactionDto = {
        wallet_id: 1,
        type: "expense",
        description: "Money for office tea",
        date: '2024-08-31',
        amount: 100
      };
      const createdUser = { id: 1, ...createWalletDto };
      jest.spyOn(transactionRepository, 'create').mockReturnValue(createdUser as Transaction);
      jest.spyOn(transactionRepository, 'save').mockResolvedValue(createdUser as Transaction);
      const result = await service.create(createWalletDto);
      expect(transactionRepository.create).toHaveBeenCalledWith(createWalletDto);
      expect(transactionRepository.save).toHaveBeenCalledWith(createdUser);
      expect(result).toEqual(createdUser);
    });
  });

  describe('findAll', () => {
    it('should return an array of wallets', async () => {
      const wallets: Transaction[] = [{ id: 1, wallet_id: 1, type: 'expense', description: 'Money for office tea', date: '2024-08-31',amount:100 }];
      jest.spyOn(transactionRepository, 'find').mockResolvedValue(wallets);
      const result = await service.findAll();
      expect(transactionRepository.find).toHaveBeenCalled();
      expect(result).toEqual(wallets);
    });
  });

  describe('findOne', () => {
    it('should return a wallet by id', async () => {
      const transaction: Transaction = { id: 1, wallet_id: 1, type: 'expense', description: 'Money for office tea', date: '2024-08-31', amount: 100 };
      jest.spyOn(transactionRepository, 'findOneBy').mockResolvedValue(transaction);
      const result = await service.findOne(1);
      expect(transactionRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(result).toEqual(transaction);
    });
  });

  describe('update', () => {
    it('should update and return a wallet by id', async () => {
      const updateTransactionDto: UpdateTransactionDto = { description: 'Money for milk & bread' };
      const updatedTransaction: Transaction = { id: 1, wallet_id: 1, type: 'expense', description: 'Money for office tea', date: '2024-08-31', amount: 100 };
      jest.spyOn(transactionRepository, 'update').mockResolvedValue(undefined);
      jest.spyOn(transactionRepository, 'findOneBy').mockResolvedValue(updatedTransaction);
      const result = await service.update(1, updateTransactionDto);
      expect(transactionRepository.update).toHaveBeenCalledWith(1, updateTransactionDto);
      expect(result).toEqual(updatedTransaction);
    });
  });

  describe('remove', () => {
    it('should delete a wallet by id', async () => {
      jest.spyOn(transactionRepository, 'delete').mockResolvedValue(undefined);
      const result = await service.remove(1);
      expect(transactionRepository.delete).toHaveBeenCalledWith(1);
      expect(result).toEqual({ deleted: true });
    });
  });
});
