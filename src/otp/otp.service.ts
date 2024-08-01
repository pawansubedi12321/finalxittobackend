import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOtpDto } from './dto/create-otp.dto';
import { UpdateOtpDto } from './dto/update-otp.dto';
import { Otp } from './entities/otp.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { VerifyOtpDto } from './dto/verify.dto';
import * as moment from 'moment-timezone';
@Injectable()
export class OtpService {
  constructor(
    @InjectRepository(Otp) private readonly otpRepo: Repository<Otp>,

  ) { }

  async send(createOtpDto: CreateOtpDto) {
    try {
      let otp = generateOTP();
      const nOtp = await this.otpRepo.create({otp: otp,phone_number: createOtpDto.phone_num});
      let type = process.env.TYPE;      
      if(type == "dev"){
        this.otpToMobileSlack(createOtpDto.phone_num, otp);
      }else{
        this.otpToMobilePhone(createOtpDto.phone_num, otp);
      }
      return await this.otpRepo.save(nOtp);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  
  async verifyOtp(otpDto: VerifyOtpDto): Promise<void> {
    try {
      const otp = await this.otpRepo.findOne({
        where: {
          otp: otpDto.otp,
          phone_number: otpDto.phone_num,
        },
      });

      if (!otp) {
        throw new HttpException('Please enter a valid number or OTP', HttpStatus.BAD_REQUEST);
      }

      // Get current date and time in Asia/Kathmandu time zone
      const currentDate = moment.tz('Asia/Kathmandu').toDate();
      console.log('Current Date and Time (Asia/Kathmandu):', moment.tz('Asia/Kathmandu').format());

      // OTP creation date and time in Asia/Kathmandu time zone
      const otpCreationDate = moment.tz('Asia/Kathmandu').toDate();
      console.log('OTP Creation Date and Time (Asia/Kathmandu):', moment.tz(otp.created_at, 'Asia/Kathmandu').format());

      // Calculate the difference in seconds
      const diff = Math.floor((currentDate.getTime() - otpCreationDate.getTime()) / 1000);
      console.log('Time Difference in Seconds:', diff);

      if (diff > 120) {
        throw new HttpException('Otp is only valid for 2 min', HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  findAll() {
    return `This action returns all otp`;
  }

  findOne(id: number) {
    return `This action returns a #${id} otp`;
  }

  update(id: number, updateOtpDto: UpdateOtpDto) {
    return `This action updates a #${id} otp`;
  }

  remove(id: number) {
    return `This action removes a #${id} otp`;
  }

  async otpToMobilePhone(phoneNum: string, otp: string) {
    let url = `https://sms.aakashsms.com/sms/v3/send`;
    let token = "cd0ae1c6a181b06efa9536f443743e12efb10f9751fc507d7d11116703f8d774";
    await axios.post(url, {
      "auth_token": token,
      "to": phoneNum,
      "text": `Dear ${phoneNum}, ${otp} is your code - XITT0`
    });
  }

  async otpToMobileSlack(phoneNum: string, otp: string) {
    let url = `https://hooks.slack.com/services/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`;
    let token = "cd0ae1c6a181b06efa9536f443743e12efb10f9751fc507d7d11116703f8d774";
    await axios.post(url, {
      "text": `Dear ${phoneNum}, ${otp} is your code - XITT0`
    });
  }
}




function generateOTP(): string {
  const chars = '0123456789';
  let otp = '';
  for (let i = 0; i < 6; i++) {
    otp += chars[Math.floor(Math.random() * chars.length)];
  }
  return otp;
}

function getSecondsDifference(date1: Date, date2: Date): number {
  const time1 = date1.getTime();
  const time2 = date2.getTime();
  const diffInMs = Math.abs(time2 - time1);
  const diffInSec = Math.floor(diffInMs / 1000);
  return diffInSec;
}
