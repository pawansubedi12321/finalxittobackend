import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { BcryptService } from 'src/core/bcryptjs/bcyrpt.service';
import { UsersService } from 'src/users/users.service';
import { UserDetails } from 'src/users/entities/userdetails.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserDetails,User]),
    JwtModule.register({
      secret: process.env.SECRET_KEY || 'Ekj1a03mOJa6AAJxwE95pZnHopvzWo',
      signOptions: {
        expiresIn: '5days',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy,
    BcryptService, UsersService]
})
export class AuthModule {}
