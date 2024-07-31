import { IsNotEmpty } from "class-validator"

export class VerifyOtpDto {
    @IsNotEmpty()
    phone_num: string

    @IsNotEmpty()
    otp: string
}
