/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { DatabaseService } from '../database/database.service';
import { Wallet } from "./entities/wallet.entity";

@Injectable()
export class WalletsService {

  constructor(private readonly databaseService: DatabaseService) {
  }

  async create(createWalletDto: CreateWalletDto) {
    const walletRepository = this.databaseService.getRepository(Wallet);
    const wallet = walletRepository.create(createWalletDto);
    return walletRepository.save(wallet);
  }

  async findAll() {
    const walletRepository = this.databaseService.getRepository(Wallet);
    return walletRepository.find();
  }

  async findOne(id: number) {
    const walletRepository = this.databaseService.getRepository(Wallet);
    return walletRepository.findOneBy({ id });
  }

  async update(id: number, updateWalletDto: UpdateWalletDto) {
    const walletRepository = this.databaseService.getRepository(Wallet);
    await walletRepository.update(id, updateWalletDto);
    return walletRepository.findOneBy({ id });
  }

  async remove(id: number) {
    const walletRepository = this.databaseService.getRepository(Wallet);
    await walletRepository.delete(id);
    return { deleted: true }
  }

  async walletTransaction(id: number) {
    const queryRunner = this.databaseService.getQueryRunner();
    try {
      return (await queryRunner).manager.query(`CALL sp_getwallettransactions(${id})`);
    } catch (error) {
      return error;
    } finally {
      (await queryRunner).release();
    }
  }

}
