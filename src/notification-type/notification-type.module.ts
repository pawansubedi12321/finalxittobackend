import { Module } from '@nestjs/common';
import { NotificationTypeService } from './notification-type.service';
import { NotificationTypeController } from './notification-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationType } from './entities/notification-type.entity';

@Module({
  imports :[
    TypeOrmModule.forFeature([NotificationType]),
  ],
  controllers: [NotificationTypeController],
  providers: [NotificationTypeService]
})
export class NotificationTypeModule {}
