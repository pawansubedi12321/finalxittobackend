import {IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsString()
    phone: string

    @IsNotEmpty()
    @IsString()
    password: string

    @IsNotEmpty()
    @IsString()
    gender: string

    @IsNotEmpty()
    @IsString()
    district: string

    @IsNotEmpty()
    @IsString()
    address: string

    @IsString()
    @IsOptional()
    invite_code: string

    @IsString()
    @IsOptional()
    role: string

    @IsString()
    @IsNotEmpty()
    otp : string
}
