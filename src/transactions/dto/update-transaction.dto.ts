/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreateTransactionDto } from './create-transaction.dto';
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateTransactionDto extends PartialType(CreateTransactionDto) {
    @IsNumber()
    @IsOptional()
    wallet_id?: number;

    @IsOptional()
    @IsString()
    type?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsDate()
    @IsOptional()
    date?: string;

    @IsOptional()
    @IsNumber()
    amount?: number
}
