/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { WalletsController } from './wallets.controller';
import { DatabaseModule } from "../database/database.module";

@Module({
  imports: [DatabaseModule],
  controllers: [WalletsController],
  providers: [WalletsService],
})
export class WalletsModule {}
