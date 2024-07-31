import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ParseFilePipe, FileTypeValidator, ClassSerializerInterceptor, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ResponseMessage } from 'src/core/decorators/response.decorator';
import * as path from 'path';
import { JwtAuthGuard } from 'src/auth/guards/jwt_auth.guards';
import { RolesGuard } from 'src/auth/guards/role_guard';
import { HasRoles } from 'src/core/decorators/has-role.decorator';
import { Role } from 'src/utils/enum/role.enum';
import { ApiTags } from '@nestjs/swagger';
import { log } from 'console';

@ApiTags("Users")
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post('create-user')
  @UseInterceptors(FileInterceptor('image'))
  // @UseInterceptors(FileInterceptor)
  @ResponseMessage("User added successfully")
  @UseInterceptors(ClassSerializerInterceptor)
  create(@UploadedFile() image: Express.Multer.File, @Body() createUserDto: CreateUserDto) {
    return this.usersService.create(image,createUserDto);
  }

  @Get("all")
  @ResponseMessage("User fetched successfully")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HasRoles(Role.ADMIN)
  @UseInterceptors(ClassSerializerInterceptor)
  findAll() {
    return this.usersService.findAll();
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    console.log(id);
    // return id;
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
