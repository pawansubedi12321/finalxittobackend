import { IsNotEmpty, IsString } from "class-validator"

export class CreateNotificationDto {
    @IsString()
    @IsNotEmpty()
    notification: string

    @IsString()
    @IsNotEmpty()
    type: string
}
