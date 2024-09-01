/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreateWalletDto } from './create-wallet.dto';
import { IsString, IsOptional, IsNumber } from "class-validator";

export class UpdateWalletDto extends PartialType(CreateWalletDto) {
    @IsNumber()
    readonly user_id?: number;

    @IsString()
    @IsOptional()
    readonly name?: string;

    @IsOptional()
    readonly description?: string;
    
    @IsOptional()
    readonly balance?: number;
}
