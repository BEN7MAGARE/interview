/* eslint-disable prettier/prettier */
import { IsString, IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    readonly phone: number;

    @IsNotEmpty()
    readonly password: string;
    
}
