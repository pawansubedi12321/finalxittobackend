import { IsNotEmpty, IsString } from "class-validator";

export class CreateBrandDto {
    @IsString()
    @IsNotEmpty()
    problem: string

    @IsNotEmpty()
    @IsString()
    name: string
}
