import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateNotificationTypeDto } from './dto/create-notification-type.dto';
import { UpdateNotificationTypeDto } from './dto/update-notification-type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { NotificationType } from './entities/notification-type.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NotificationTypeService {

  constructor(
     @InjectRepository(NotificationType) private readonly ntRepo: Repository<NotificationType>,
  ){}

  async create(createNotificationTypeDto: CreateNotificationTypeDto) {
    try {
      let nType = await this.ntRepo.create(createNotificationTypeDto);
      return await this.ntRepo.save(nType);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(query: any) {
    try {
      var queryBuilder = await this.ntRepo.createQueryBuilder('type').select(['type.active', 'type.code','type.title']);
      if(query.active){
        queryBuilder = queryBuilder.where("type.active = :active",{active: query.active});
      }
      let nType = await queryBuilder.getMany();
      return nType;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }  
  }

  findOne(id: number) {
    return `This action returns a #${id} notificationType`;
  }

  update(id: number, updateNotificationTypeDto: UpdateNotificationTypeDto) {
    return `This action updates a #${id} notificationType`;
  }

  remove(id: number) {
    return `This action removes a #${id} notificationType`;
  }
}
