import { IsNotEmpty, IsString } from "class-validator";

export class CreateProblemDto {
    @IsNotEmpty()
    @IsString()
    category: string

    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsString()
    price: string

    @IsNotEmpty()
    @IsString()
    estTime: string

    @IsNotEmpty()
    @IsString()
    shortDescription: string

}
