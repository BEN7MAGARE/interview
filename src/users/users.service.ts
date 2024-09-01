/* eslint-disable prettier/prettier */
import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DatabaseService } from '../database/database.service';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {
    this.initializeDatabase();
  }

  private async initializeDatabase() {
    await this.databaseService.initialize();
  }

  async create(createUserDto: CreateUserDto) {
    const userRepository = this.databaseService.getRepository(User);
    const existingUserEmail = await userRepository.findOneBy({ email: createUserDto.email });
    if (existingUserEmail !== null && existingUserEmail.id !== undefined) {
      throw new ConflictException(existingUserEmail);
    }
    const existingUserPhone = await userRepository.findOneBy({ email: createUserDto.email });
    if (existingUserPhone !== null && existingUserPhone.id !== undefined) {
      throw new ConflictException(existingUserPhone);
    }
    const user = userRepository.create(createUserDto);
    return userRepository.save(user);
  }

  findAll() {
    const userRepository = this.databaseService.getRepository(User);
    return userRepository.find();
  }

  findOne(id: number) {
    const userRepository = this.databaseService.getRepository(User);
    return userRepository.findOneBy({ id });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const userRepository = this.databaseService.getRepository(User);
    await userRepository.update(id, updateUserDto);
    return userRepository.findOneBy({ id });
  }

  async remove(id: number) {
    const userRepository = this.databaseService.getRepository(User);
    await userRepository.delete(id);
    return { deleted: true };
  }

  async summary(id: number) {
    const queryRunner = this.databaseService.getQueryRunner();
    try {
      const summary = (await queryRunner).manager.query(`CALL sp_getusersummary(${id})`);
      const data = await summary.then((params) => { return params });

      const totalIncome = data.reduce((sum: any, transaction: any) => {
        return sum + parseFloat(transaction.income_amount);
      }, 0);

      const totalExpenses = data.reduce((sum: any, transaction: any) => {
        return sum + parseFloat(transaction.expense_amount);
      }, 0);
      return { balance: totalIncome - totalExpenses, wallets: data };
    } catch (error) {
      return error;
    } finally {
      await (await queryRunner).release();
    }
  }
}
