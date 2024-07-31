import { IsNotEmpty, ValidateNested } from "class-validator";
import { CreateBookingDto } from "./create-booking.dto";
import { CreateTransactionDto } from "src/transaction/dto/create-transaction.dto";
import { Type } from "class-transformer";

export class BookingDto{
    @ValidateNested()
    @IsNotEmpty()
    @Type(() => CreateBookingDto)
    bookingDetails:  CreateBookingDto;

    @ValidateNested()
    @IsNotEmpty()
    @Type(() => CreateTransactionDto)
    paymentDetails: CreateTransactionDto;
}