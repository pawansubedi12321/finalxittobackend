import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { BcryptService } from 'src/core/bcryptjs/bcyrpt.service';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { BASE_URL } from 'src/core/constant/constant';
import { ChangePasswordDto } from './dto/change.password.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private bcryptService: BcryptService,
    private usersService: UsersService,
  ) { }


  async login(loginDto: LoginDto) {

    let user = await this.usersService.findOneByPhone(
      loginDto.phone,
    );
    if (user != null) {
      let comparePassword = await this.bcryptService.comparePassword(
        loginDto.password,
        user.password,
      );

      if (comparePassword) {
        const payload = {
          id: user.id,
          phone: user.phone ?? null,
          role: user.role,
          
        };
        const accessToken = await this.jwtService.signAsync(payload);
        if (user.profile_url != null) {
          user.profile_url = `${process.env.BASE_URL}${user.profile_url}`
        }
        return {
          ...payload,
          profile_url : user.profile_url,
          phone: user.phone,
          accessToken,
          name: user.name,
          userDetails: user.userDetails,
        };
      } else {
        throw new HttpException('Please enter a valid password', HttpStatus.BAD_REQUEST);
      }
    }
    throw new HttpException('Please enter a valid phone number', HttpStatus.BAD_REQUEST);
  }


  async changePassword(changePasswordDto: ChangePasswordDto, userId: string) {
    // return userId;
    try {
      let user = await this.usersService.findOne(userId);
      // return user;
      if (user != null) {
        let comparePassword = await this.bcryptService.comparePassword(
          changePasswordDto.currentPassword,
          user.password,
        );
        // return comparePassword;
        if (comparePassword) {
          const hashPassword = await this.bcryptService.hashPassword(
            changePasswordDto.password,
          );
          // return hashPassword;
          let data = await this.usersService.changePassword(userId, hashPassword);
          // return data;
          return {
            "updatePssword" :changePasswordDto.password
          }
        } else {
          throw new HttpException("Please enter a valid password", HttpStatus.BAD_REQUEST);
        }
      } else {
        throw new HttpException("Please enter a valid password", HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);

    }
  }

  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
