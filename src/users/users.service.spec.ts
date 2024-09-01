/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { DatabaseService } from '../database/database.service';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UsersService', () => {
  let service: UsersService;
  let databaseService: DatabaseService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: DatabaseService,
          useValue: {
            getRepository: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    databaseService = module.get<DatabaseService>(DatabaseService);

    // Use an explicit type cast to inform TypeScript about the type.
    userRepository = {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      findOneBy: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    } as unknown as Repository<User>;

    // Ensure the mocked `getRepository` returns the `userRepository`
    jest.spyOn(databaseService, 'getRepository').mockReturnValue(userRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and save a user', async () => {
      const createUserDto: CreateUserDto = {
        name: 'John Doe',
        email: 'john.doe@example.com', phone: 712773739,
        password: 'password123',
      };

      const createdUser = { id: 1, ...createUserDto };
      jest.spyOn(userRepository, 'create').mockReturnValue(createdUser as User);
      jest.spyOn(userRepository, 'save').mockResolvedValue(createdUser as User);

      const result = await service.create(createUserDto);
      expect(userRepository.create).toHaveBeenCalledWith(createUserDto);
      expect(userRepository.save).toHaveBeenCalledWith(createdUser);
      expect(result).toEqual(createdUser);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users: User[] = [{ id: 1, name: 'John Doe', email: 'john.doe@example.com', phone: 712773739, password: 'password123' }];
      jest.spyOn(userRepository, 'find').mockResolvedValue(users);

      const result = await service.findAll();
      expect(userRepository.find).toHaveBeenCalled();
      expect(result).toEqual(users);
    });
  });

  describe('findOne', () => {
    it('should return a user by id', async () => {
      const user: User = { id: 1, name: 'John Doe', email: 'john.doe@example.com', phone: 712773739, password: 'password123' };
      jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(user);

      const result = await service.findOne(1);
      expect(userRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(result).toEqual(user);
    });
  });

  describe('update', () => {
    it('should update and return a user by id', async () => {
      const updateUserDto: UpdateUserDto = { name: 'Jane Doe' };
      const updatedUser: User = { id: 1, name: 'Jane Doe', email: 'john.doe@example.com', phone: 712773739, password: 'password123' };

      jest.spyOn(userRepository, 'update').mockResolvedValue(undefined);
      jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(updatedUser);

      const result = await service.update(1, updateUserDto);
      expect(userRepository.update).toHaveBeenCalledWith(1, updateUserDto);
      expect(result).toEqual(updatedUser);
    });
  });

  describe('remove', () => {
    it('should delete a user by id', async () => {
      jest.spyOn(userRepository, 'delete').mockResolvedValue(undefined);

      const result = await service.remove(1);
      expect(userRepository.delete).toHaveBeenCalledWith(1);
      expect(result).toEqual({ deleted: true });
    });
  });
});
