import { HttpException, HttpStatus, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { extname } from 'path';
import { diskStorage } from "multer";
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserDetails } from './entities/userdetails.entity';
import { BcryptService } from 'src/core/bcryptjs/bcyrpt.service';
import { Otp } from 'src/otp/entities/otp.entity';
import { OtpService } from 'src/otp/otp.service';

@Module({
  imports: [
    MulterModule.register({
      fileFilter: (req, image, cb) => {
        if (!image.originalname.match(/\.(png|jpeg|jpg)$/)) {
          return cb(new HttpException('Only PNG files are allowed!', HttpStatus.BAD_REQUEST), false);
        }
        cb(null, true);
      },
      storage: diskStorage({
        destination: './static/profile',
        filename: (req, image, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}${extname(image.originalname)}`);
        },
      }),
    },
    ),
    TypeOrmModule.forFeature([User, UserDetails,Otp])
  ],
  controllers: [UsersController],
  providers: [UsersService,BcryptService,OtpService]
})
export class UsersModule { }
