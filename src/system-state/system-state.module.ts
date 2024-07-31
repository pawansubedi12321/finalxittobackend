import { Module } from '@nestjs/common';
import { SystemStateService } from './system-state.service';
import { SystemStateController } from './system-state.controller';
import { NotificationTypeService } from 'src/notification-type/notification-type.service';
import { NotificationModule } from 'src/notification/notification.module';
import { NotificationType } from 'src/notification-type/entities/notification-type.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/category/entities/category.entity';
import { CategoryService } from 'src/category/category.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([NotificationType, Category])
  ],
  controllers: [SystemStateController],
  providers: [SystemStateService, NotificationTypeService, CategoryService]
})
export class SystemStateModule {}
