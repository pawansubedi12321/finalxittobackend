import { IsNotEmpty } from "class-validator"

export class CreateOtpDto {
    @IsNotEmpty()
    phone_num: string

    // @IsNotEmpty()
    // otp: string
}
