import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, ClassSerializerInterceptor, UseGuards, Req, Query } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { BookingDto } from './dto/booking.dto';
import { ResponseMessage } from 'src/core/decorators/response.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt_auth.guards';
import { FilterBookingDto } from './dto/filterbooking.dto';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post('create')
  @UseGuards(JwtAuthGuard)
  @ResponseMessage('Booked successfully')
  @UseInterceptors(ClassSerializerInterceptor)
  create(@Body() bookingDto: BookingDto, @Req() req : any) {
    // return req.user.id;
    return this.bookingService.create(bookingDto,req.user.id);
  }

  @Get('get-all')
  @UseGuards(JwtAuthGuard)
  @ResponseMessage('Booking fetched successfully')
  @UseInterceptors(ClassSerializerInterceptor)
  findAll(@Req() req : any) {
    return this.bookingService.findAll(req.user.id, req.user.role);
  }

  @Get('assistance/all')
  @UseGuards(JwtAuthGuard)
  @ResponseMessage('Booking fetched successfully')
  @UseInterceptors(ClassSerializerInterceptor)
  getAllByAssistance(@Req() req : any) {
    return this.bookingService.assignToAssistance(req.user.id, req.user.role);
  }


  @Get('assistance/filter')
  @UseGuards(JwtAuthGuard)
  @ResponseMessage('Booking fetched successfully')
  @UseInterceptors(ClassSerializerInterceptor)
  filterByAssistance(@Req() req : any, @Body() bookingDto: FilterBookingDto, @Query() query: any) {
    return this.bookingService.filterBookingByAssistance(req.user.id,query,req.user.role);
  }

  @Get('assistance/count')
  @UseGuards(JwtAuthGuard)
  @ResponseMessage('Booking fetched successfully')
  @UseInterceptors(ClassSerializerInterceptor)
  getAssistanceCount(@Req() req : any) {
    return this.bookingService.getAssistanceCount(req.user.id);
  }

  @Get('filter')
  @UseGuards(JwtAuthGuard)
  @ResponseMessage('Booking fetched successfully')
  @UseInterceptors(ClassSerializerInterceptor)
  filter(@Req() req : any, @Body() bookingDto: FilterBookingDto, @Query() query: any) {
    return this.bookingService.filterBooking(req.user.id,query,req.user.role);
  }

  
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookingService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ResponseMessage("Post updated successfully")
  @UseInterceptors(ClassSerializerInterceptor)
  update(@Param('id') id: string, @Body() updateBookingDto: UpdateBookingDto) {
    return this.bookingService.update(id, updateBookingDto);
  }
  
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookingService.remove(+id);
  }
}
