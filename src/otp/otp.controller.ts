import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OtpService } from './otp.service';
import { CreateOtpDto } from './dto/create-otp.dto';
import { UpdateOtpDto } from './dto/update-otp.dto';
import { ResponseMessage } from 'src/core/decorators/response.decorator';
import { InjectRepository } from '@nestjs/typeorm';
import { Otp } from './entities/otp.entity';
import { Repository } from 'typeorm';
import { VerifyOtpDto } from './dto/verify.dto';

@Controller('otp')
export class OtpController {
  constructor(
    private readonly otpService: OtpService,
  ) {}

  @Post('send')
  @ResponseMessage("Otp send successfully")
  create(@Body() createOtpDto: CreateOtpDto) {
    return this.otpService.send(createOtpDto);
  }

  @Post('verify')
  @ResponseMessage("Otp verified successfully")
  verify(@Body() verifyOtp: VerifyOtpDto) {
    return this.otpService.verifyOtp(verifyOtp);
  }

  @Get()
  findAll() {
    return this.otpService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.otpService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOtpDto: UpdateOtpDto) {
    return this.otpService.update(+id, updateOtpDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.otpService.remove(+id);
  }
}
