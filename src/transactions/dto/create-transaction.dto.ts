/* eslint-disable prettier/prettier */
import { IsString, IsNumber, IsNotEmpty, IsDate, IsOptional } from "class-validator";

export class CreateTransactionDto {
    @IsNumber()
    @IsNotEmpty()
    wallet_id: number;

    // Specify if transaction is income or expense
    @IsString()
    type: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsDate()
    date: string;

    @IsNotEmpty()
    @IsNumber()
    amount: number
}
