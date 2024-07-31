import { IsEmail, IsNotEmpty } from "class-validator"

export class CreateAssistanceDto {

    @IsNotEmpty()
    @IsEmail()
    mail: string

    @IsNotEmpty()
    category: string //service category

    @IsNotEmpty()
    availability: string

    @IsNotEmpty()
    level_of_assistance: string

    @IsNotEmpty()
    daily_bill: string

    @IsNotEmpty()
    experience: string

    status: string
}
