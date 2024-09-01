/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { WalletsController } from './wallets.controller';
import { WalletsService } from './wallets.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';

describe('UsersController', () => {
  let controller: WalletsController;
  let service: WalletsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WalletsController],
      providers: [
        {
          provide: WalletsService,
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

    controller = module.get<WalletsController>(WalletsController);
    service = module.get<WalletsService>(WalletsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const createWalletDto: CreateWalletDto = { user_id:1, name: 'Test Wallet', description: 'A wallet to test', balance: 0 };
      const result = { id: 1, ...createWalletDto };
      jest.spyOn(service, 'create').mockResolvedValue(result);

      expect(await controller.create(createWalletDto)).toBe(result);
      expect(service.create).toHaveBeenCalledWith(createWalletDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of wallets', async () => {
      const result = [{ id: 1, user_id: 1, name: 'Test Wallet', email: 'A wallet to test', balance: 0 }];
      jest.spyOn(service, 'findAll').mockResolvedValue(result);
      expect(await controller.findAll()).toBe(result);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single wallet', async () => {
      const result = { id: 1, user_id: 1, name: 'Test Wallet', description: 'A wallet to test', balance: 0 };
      jest.spyOn(service, 'findOne').mockResolvedValue(result);

      expect(await controller.findOne('1')).toBe(result);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('should update a wallet', async () => {
      const updateWalletDto: UpdateWalletDto = { name: 'Updated Wallet', description: 'A wallet to test', balance: 0 };
      const result = { id: 1, ...updateWalletDto };
      jest.spyOn(service, 'update').mockResolvedValue(result);

      expect(await controller.update('1', updateWalletDto)).toBe(result);
      expect(service.update).toHaveBeenCalledWith(1, updateWalletDto);
    });
  });

  describe('remove', () => {
    it('should remove a wallet', async () => {
      jest.spyOn(service, 'remove').mockResolvedValue({ deleted: true });
      await expect(controller.remove('1')).resolves.toEqual({ deleted: true });
      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
});
