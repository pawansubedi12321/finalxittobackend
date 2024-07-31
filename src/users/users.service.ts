import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserDetails } from './entities/userdetails.entity';
import { log } from 'console';
import { BcryptService } from 'src/core/bcryptjs/bcyrpt.service';
import { BASE_URL } from 'src/core/constant/constant';
import { use } from 'passport';
import { OtpService } from 'src/otp/otp.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(UserDetails) private readonly userDetailsRepo: Repository<UserDetails>,
    private readonly bcryptService: BcryptService,
    private readonly otpServices: OtpService,
  ) { }

  //create user 
  async create(image: Express.Multer.File, createUserDto: CreateUserDto) {
    // return image.path;
    let imagePath: any = null;
    if(image != null){
      imagePath= image.path;
    }
    try { 
      await this.otpServices.verifyOtp({"phone_num": createUserDto.phone, "otp": createUserDto.otp});
      let isUserExits = await this.userRepo.createQueryBuilder('user').where('phone = :phone', {
        phone: createUserDto.phone
      }).getOne();
      if (isUserExits != null) {
        throw new HttpException("User already exits", HttpStatus.BAD_REQUEST);
      }
      const hashPassword = await this.bcryptService.hashPassword(
        createUserDto.password,
      );
      const nUserDetails = await this.userDetailsRepo.create(
        {
          district: createUserDto.district,
          gender: createUserDto.gender,
          location: createUserDto.address,
          refer_code: generateUniqueString(),
        }
      );
      var userDetails = await this.userDetailsRepo.save({ ...nUserDetails });
      const nUser = await this.userRepo.create(
        {
          ...createUserDto,
          profile_url: imagePath,
          password: hashPassword,
          userDetails: userDetails,
                    //  userDetails: detailsId,
        }
      );
      let data = await this.userRepo.save({ ...nUser });
      if (createUserDto.invite_code != null) {
        const user = await this.userDetailsRepo
          .createQueryBuilder('user')
          .where('refer_code= :code', {
            code: createUserDto.invite_code,
          }).getOne();
        if (user) {
          await this.userDetailsRepo.createQueryBuilder('user').update(UserDetails).set(
            {
              earnings: (user).earnings + 10,
            }
          ).where("id = :id", { id: (user).id }).execute();
        }
      }
      return {
        ...data,
        userDetails: userDetails,
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }


  async findOneByPhone(phone: string) {
    try {
      let user = await this.userRepo.createQueryBuilder('user').leftJoinAndSelect('user.userDetails', 'userDetails').where(
        'user.phone= :phone', {phone: phone}
      ).getOne(); 
      if (user != null) {
        return user;
      }
      return null;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    try {
      let users = await this.userRepo.createQueryBuilder('user').leftJoinAndSelect('user.userDetails', 'userDetails').getMany(); 
      
      let updatedUsers = users.map((element)=>{
        if(element.profile_url !=null){
          element.profile_url = `${process.env.BASE_URL}${element.profile_url}`;
        }
        return element;
      });
      return updatedUsers;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: string) {
    // return id;
    try {
      let user = await this.userRepo.createQueryBuilder('user').leftJoinAndSelect('user.userDetails', 'userDetails').where("user.id = :id", { id: id }).getOne(); 
      return user;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async changePassword(id: string, password : string){
    // return id;
    try {
     let data = await this.userRepo.createQueryBuilder('user').update(User).set({
        password: password
      }).where("id = :id", {id: id}).execute();
      return data;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }


  async changePhoneNumber(id: string, phone : string){
    // return id;
    try {
     let data = await this.userRepo.createQueryBuilder('user').update(User).set({
        phone: phone
      }).where("id = :id", {id: id}).execute();
      return data;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      let data = await this.userRepo.createQueryBuilder('user').update(User).set(updateUserDto).where("id = :id", {id: id}).execute();
      return await this.findOne(id);
     } catch (error) {
       throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
     }
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}


function generateUniqueString(): string {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < 10; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}