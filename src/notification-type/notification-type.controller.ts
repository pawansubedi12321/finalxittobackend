import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { NotificationTypeService } from './notification-type.service';
import { CreateNotificationTypeDto } from './dto/create-notification-type.dto';
import { UpdateNotificationTypeDto } from './dto/update-notification-type.dto';
import { ResponseMessage } from 'src/core/decorators/response.decorator';

@Controller('notification-type')
export class NotificationTypeController {
  constructor(private readonly notificationTypeService: NotificationTypeService) {}

  @Post()
  @ResponseMessage("Notification type created sucessfully")
  create(@Body() createNotificationTypeDto: CreateNotificationTypeDto) {    
    return this.notificationTypeService.create(createNotificationTypeDto);
  }

  @Get()
  findAll(@Query() query: any) {    
    return this.notificationTypeService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notificationTypeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNotificationTypeDto: UpdateNotificationTypeDto) {
    return this.notificationTypeService.update(+id, updateNotificationTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notificationTypeService.remove(+id);
  }
}
