import { IsNotEmpty, IsString } from "class-validator";

export class CreateHelpDto {

    @IsString()
    @IsNotEmpty()
    question: string

    @IsString()
    @IsNotEmpty()
    answer: string
    
}
