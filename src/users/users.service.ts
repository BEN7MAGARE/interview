/* eslint-disable prettier/prettier */
// src/users/users.service.ts

import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DatabaseService } from '../database/database.service';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) { }

  async create(createUserDto: CreateUserDto) {
    const userRepository = this.databaseService.getRepository(User);
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
}
