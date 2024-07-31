import { IsNotEmpty, IsOptional, IsString } from "class-validator"

export class UpdateUser {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsString()
    phone: string

}