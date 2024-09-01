/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { WalletsService } from './wallets.service';
import { DatabaseService } from '../database/database.service';
import { Wallet } from './entities/wallet.entity';
import { Repository } from 'typeorm';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';

describe('UsersService', () => {
  let service: WalletsService;
  let databaseService: DatabaseService;
  let walletRepository: Repository<Wallet>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WalletsService,
        {
          provide: DatabaseService,
          useValue: {
            getRepository: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<WalletsService>(WalletsService);
    databaseService = module.get<DatabaseService>(DatabaseService);

    // Use an explicit type cast to inform TypeScript about the type.
    walletRepository = {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      findOneBy: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    } as unknown as Repository<Wallet>;

    // Ensure the mocked `getRepository` returns the `userRepository`
    jest.spyOn(databaseService, 'getRepository').mockReturnValue(walletRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and save a user', async () => {
      const createWalletDto: CreateWalletDto = {
        user_id:1,
        name: 'Savings',
        description: 'My savings test wallet',
        balance: 0,
      };

      const createdUser = { id: 1, ...createWalletDto };
      jest.spyOn(walletRepository, 'create').mockReturnValue(createdUser as Wallet);
      jest.spyOn(walletRepository, 'save').mockResolvedValue(createdUser as Wallet);

      const result = await service.create(createWalletDto);
      expect(walletRepository.create).toHaveBeenCalledWith(createWalletDto);
      expect(walletRepository.save).toHaveBeenCalledWith(createdUser);
      expect(result).toEqual(createdUser);
    });
  });

  describe('findAll', () => {
    it('should return an array of wallets', async () => {
      const wallets: Wallet[] = [{ id: 1, user_id: 1, name: 'Savings', description: 'My savings test wallet', balance: 0 }];
      jest.spyOn(walletRepository, 'find').mockResolvedValue(wallets);

      const result = await service.findAll();
      expect(walletRepository.find).toHaveBeenCalled();
      expect(result).toEqual(wallets);
    });
  });

  describe('findOne', () => {
    it('should return a wallet by id', async () => {
      const wallet: Wallet = { id: 1, user_id: 1, name: 'Savings', description: 'My savings test wallet', balance: 0 };
      jest.spyOn(walletRepository, 'findOneBy').mockResolvedValue(wallet);
      const result = await service.findOne(1);
      expect(walletRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(result).toEqual(wallet);
    });
  });

  describe('update', () => {
    it('should update and return a wallet by id', async () => {
      const updateWalletDto: UpdateWalletDto = { name: 'Expenses Wallet' };
      const updatedWallet: Wallet = { id: 1, user_id: 1, name: 'Expenses Wallet', description: 'john.doe@example.com', balance: 0 };
      jest.spyOn(walletRepository, 'update').mockResolvedValue(undefined);
      jest.spyOn(walletRepository, 'findOneBy').mockResolvedValue(updatedWallet);
      const result = await service.update(1, updateWalletDto);
      expect(walletRepository.update).toHaveBeenCalledWith(1, updateWalletDto);
      expect(result).toEqual(updatedWallet);
    });
  });

  describe('remove', () => {
    it('should delete a wallet by id', async () => {
      jest.spyOn(walletRepository, 'delete').mockResolvedValue(undefined);
      const result = await service.remove(1);
      expect(walletRepository.delete).toHaveBeenCalledWith(1);
      expect(result).toEqual({ deleted: true });
    });
  });
});
