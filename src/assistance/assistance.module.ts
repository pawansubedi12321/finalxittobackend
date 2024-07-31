import { Module } from '@nestjs/common';
import { AssistanceService } from './assistance.service';
import { AssistanceController } from './assistance.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Assistance } from './entities/assistance.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Assistance,User])
  ],
  controllers: [AssistanceController],
  providers: [AssistanceService]
})
export class AssistanceModule {}
