import { HttpException, HttpStatus, Module } from '@nestjs/common';
import { ProblemsService } from './problems.service';
import { ProblemsController } from './problems.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Problem } from './entities/problem.entity';

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
        destination: './static/problems',
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
    TypeOrmModule.forFeature([Problem]),
  ],
  controllers: [ProblemsController],
  providers: [ProblemsService]
})
export class ProblemsModule {}
