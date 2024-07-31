import { IsNotEmpty, IsNumber, IsOptional, IsString, isNumber } from "class-validator";

export class CreateBookingDto {
    @IsNotEmpty()
    @IsString()
    bookedProblem: string;

    @IsOptional()
    selectedBrand: string;

    @IsOptional()
    assignTo: string;

    @IsNotEmpty()
    @IsString()
    bookedDate: string;

    @IsNotEmpty()
    @IsNumber()
    itemCount: number;

    @IsOptional()
    completedDate: string

    @IsNotEmpty()
    @IsString()
    timePeriod: string

    @IsNotEmpty()
    location: any

    @IsNotEmpty()
    @IsString()
    problemInterval: string

    @IsNotEmpty()
    @IsString()
    description: string

    @IsOptional()
    status: string  

    @IsOptional()
    transactionMode : string
}
