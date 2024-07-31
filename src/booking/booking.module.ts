import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { TransactionService } from 'src/transaction/transaction.service';
import { Transaction } from 'src/transaction/entities/transaction.entity';
import { Assistance } from 'src/assistance/entities/assistance.entity';
import { Category } from 'src/category/entities/category.entity';

@Module({
  imports : [
    TypeOrmModule.forFeature([Booking, Transaction, Assistance, Category ]),
  ],
  controllers: [BookingController],
  providers: [BookingService, TransactionService]
})
export class BookingModule {}
