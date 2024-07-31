import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, ClassSerializerInterceptor, UploadedFile } from '@nestjs/common';
import { ProblemsService } from './problems.service';
import { CreateProblemDto } from './dto/create-problem.dto';
import { UpdateProblemDto } from './dto/update-problem.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt_auth.guards';
import { RolesGuard } from 'src/auth/guards/role_guard';
import { HasRoles } from 'src/core/decorators/has-role.decorator';
import { Role } from 'src/utils/enum/role.enum';
import { ResponseMessage } from 'src/core/decorators/response.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { log } from 'console';

@Controller('problems')
export class ProblemsController {
  constructor(private readonly problemsService: ProblemsService) {}

  @Post('create')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HasRoles(Role.ADMIN)
  @ResponseMessage("Problems added successfully")
  @UseInterceptors(FileInterceptor('image'))
  @UseInterceptors(ClassSerializerInterceptor)
  create(@UploadedFile() image: Express.Multer.File, @Body() createProblemDto: CreateProblemDto) {
    // return image.path;
    return this.problemsService.create(image,createProblemDto);
  }

  @Get('get-all/:id')
  // @UseGuards(JwtAuthGuard)
  @ResponseMessage("Problems fetched successfully")
  @UseInterceptors(ClassSerializerInterceptor)
  findAll(@Param('id') id: string) {
    console.log(id);
    return this.problemsService.findAll(id);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.problemsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateProblemDto: UpdateProblemDto) {
  //   return this.problemsService.update(+id, updateProblemDto);
  // }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HasRoles(Role.ADMIN)
  @ResponseMessage("Problems deleted successfully")
  @UseInterceptors(ClassSerializerInterceptor)
  remove(@Param('id') id: string) {
    return this.problemsService.remove(id);
  }
}
