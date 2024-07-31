import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppDataSource } from './config/database.config';
import MailConfig from './config/mail.config';
import { ThrottlerModule } from '@nestjs/throttler';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { EmailModule } from './email/email.module';
import { MailerModule } from '@nestjs-modules/mailer';
import ThrottlerConfig from './config/throttler.config';
import { EventsModule } from './ws-events/events.module';
// import { ServicesModule } from './services/services.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CategoryModule } from './category/category.module';
import { AssistanceModule } from './assistance/assistance.module';
import { ProblemsModule } from './problems/problems.module';
import { BrandModule } from './brand/brand.module';
import { BookingModule } from './booking/booking.module';
import { TransactionModule } from './transaction/transaction.module';
import { HelpModule } from './help/help.module';
import { OtpModule } from './otp/otp.module';
import { QuestionsModule } from './questions/questions.module';
import { NotificationModule } from './notification/notification.module';
import { NotificationTypeModule } from './notification-type/notification-type.module';
import { SystemStateModule } from './system-state/system-state.module';
import { SocialMediaModule } from './social-media/social-media.module';
import { MapModule } from './map/map.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    //A common technique to protect applications from brute-force attacks is rate-limiting
    ThrottlerModule.forRoot(ThrottlerConfig),

    //events
    EventEmitterModule.forRoot(),

    //db config
    TypeOrmModule.forRoot(AppDataSource.options),

    //mail config
    MailerModule.forRoot(MailConfig),


    EmailModule,

    EventsModule,

    AuthModule,

    UsersModule,

    CategoryModule,

    AssistanceModule,

    ProblemsModule,

    BrandModule,

    BookingModule,

    TransactionModule,

    HelpModule,

    OtpModule,

    QuestionsModule,

    NotificationModule,

    NotificationTypeModule,

    SystemStateModule,

    SocialMediaModule,

    MapModule,

  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
