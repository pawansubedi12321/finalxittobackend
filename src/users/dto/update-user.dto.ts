import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import {IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { UpdateUser } from './user.dto';


export class UpdateUserDto extends PartialType(UpdateUser) {}


