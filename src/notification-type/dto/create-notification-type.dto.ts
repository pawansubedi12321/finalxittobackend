import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class CreateNotificationTypeDto {

    @IsString()
    @IsNotEmpty()
    title : string

    active: boolean

    @IsString()
    @IsNotEmpty()
    code : string
}
