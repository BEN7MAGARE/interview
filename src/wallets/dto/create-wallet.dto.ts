/* eslint-disable prettier/prettier */
import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateWalletDto {
    @IsNumber()
    readonly user_id: number;

    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsString()
    readonly description: string;

    @IsNumber()
    readonly balance: number;
}
