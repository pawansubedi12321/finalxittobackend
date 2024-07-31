import { IsNotEmpty, IsNumber, IsOptional, IsString, isNumber } from "class-validator";
import { IsNull } from "typeorm";

export class FilterBookingDto {

    @IsOptional()
    selectedBrand: string;

    @IsOptional()
    assignTo: string;

    @IsOptional()
    bookedDate: string;

    @IsOptional()
    itemCount: string;

    @IsOptional()
    completedDate: string

    @IsOptional()
    timePeriod: string

    @IsOptional()
    location: string

    @IsOptional()
    problemInterval: string

    @IsOptional()
    description: string

    @IsOptional()
    status: string  

    @IsOptional()
    transactionMode : string

    
    @IsOptional()
    catId : string
}
