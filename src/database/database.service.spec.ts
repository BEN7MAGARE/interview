/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseService } from './database.service';

describe('DatabaseService', () => {
  let service: DatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DatabaseService],
    }).compile();

    service = module.get<DatabaseService>(DatabaseService);
    await service.initialize(); 
  });

  afterEach(async () => {
    await service.closeConnection();
  });

  // close all connections after tests
  afterAll(async () => {
    await service.closeConnection(); 
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
