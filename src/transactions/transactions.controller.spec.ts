/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

describe('UsersController', () => {
  let controller: TransactionsController;
  let service: TransactionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionsController],
      providers: [
        {
          provide: TransactionsService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<TransactionsController>(TransactionsController);
    service = module.get<TransactionsService>(TransactionsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new transaction', async () => {
      const createTransactionDto: CreateTransactionDto = { wallet_id: 1, type: 'expense', description: 'Money for office tea', date: '2024-08-31', amount: 100 };
      const result = { id: 1, ...createTransactionDto };
      jest.spyOn(service, 'create').mockResolvedValue(result);
      expect(await controller.create(createTransactionDto)).toBe(result);
      expect(service.create).toHaveBeenCalledWith(createTransactionDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of transactions', async () => {
      const result = [{ id: 1, wallet_id: 1, type: 'expense', description: 'Money for office tea', date: '2024-08-31', amount: 100 }];
      jest.spyOn(service, 'findAll').mockResolvedValue(result);
      expect(await controller.findAll()).toBe(result);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single transaction', async () => {
      const result = { id: 1, wallet_id: 1, type: 'expense', description: 'Money for office tea', date: '2024-08-31', amount: 100 };
      jest.spyOn(service, 'findOne').mockResolvedValue(result);
      expect(await controller.findOne('1')).toBe(result);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('should update a transaction', async () => {
      const updateTransactionDto: UpdateTransactionDto = { wallet_id: 1, type: 'expense', description: 'Money for office tea', date: '2024-08-31', amount: 100 };
      const result = { id: 1, ...updateTransactionDto };
      jest.spyOn(service, 'update').mockResolvedValue(result);

      expect(await controller.update('1', updateTransactionDto)).toBe(result);
      expect(service.update).toHaveBeenCalledWith(1, updateTransactionDto);
    });
  });

  describe('remove', () => {
    it('should remove a transaction', async () => {
      jest.spyOn(service, 'remove').mockResolvedValue({ deleted: true });
      await expect(controller.remove('1')).resolves.toEqual({ deleted: true });
      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
});
