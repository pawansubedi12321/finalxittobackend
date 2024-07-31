import { HttpException, HttpStatus, Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { extname } from 'path';


@Module({
  imports:[
    MulterModule.register({
      fileFilter: (req, image, cb) => {
        if (!image.originalname.match(/\.(png|jpeg|jpg)$/)) {
          return cb(new HttpException('Only PNG files are allowed!', HttpStatus.BAD_REQUEST), false);
        }
        cb(null, true);
      },
      storage: diskStorage({
        destination: './static/category',
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
    TypeOrmModule.forFeature([Category]),

  ],
  controllers: [CategoryController],
  providers: [CategoryService]
})
export class CategoryModule {}
