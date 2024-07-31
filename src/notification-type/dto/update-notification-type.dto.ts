import { PartialType } from '@nestjs/swagger';
import { CreateNotificationTypeDto } from './create-notification-type.dto';

export class UpdateNotificationTypeDto extends PartialType(CreateNotificationTypeDto) {}
