import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateTransactionDto {
    @IsOptional()
    booking: string;

    @IsNotEmpty()
    @IsNumber()
    totalAmount: Number

    @IsOptional()
    discountAmount: Number

    @IsOptional()
    redeemAmount: Number

    @IsOptional()
    transactionDate: string

    @IsOptional()
    transactionId: string

    @IsOptional()
    transactionStatus: string
}
