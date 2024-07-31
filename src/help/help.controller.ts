import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { HelpService } from './help.service';
import { CreateHelpDto } from './dto/create-help.dto';
import { UpdateHelpDto } from './dto/update-help.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt_auth.guards';
import { RolesGuard } from 'src/auth/guards/role_guard';
import { HasRoles } from 'src/core/decorators/has-role.decorator';
import { ResponseMessage } from 'src/core/decorators/response.decorator';
import { Role } from 'src/utils/enum/role.enum';

@Controller('help')
export class HelpController {
  constructor(private readonly helpService: HelpService) {}

  @Post('create')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HasRoles(Role.ADMIN)
  @ResponseMessage('Successfully added help')
  @UseInterceptors(ClassSerializerInterceptor)
  create(@Body() createHelpDto: CreateHelpDto) {
    return this.helpService.create(createHelpDto);
  }

  @Get('all')
  @UseGuards(JwtAuthGuard)
  // @HasRoles(Role.ADMIN)
  @ResponseMessage('Successfully fetched help')
  @UseInterceptors(ClassSerializerInterceptor)
  findAll() {
    return this.helpService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.helpService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHelpDto: UpdateHelpDto) {
    return this.helpService.update(+id, updateHelpDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HasRoles(Role.ADMIN)
  @ResponseMessage('Successfully deleted help')
  @UseInterceptors(ClassSerializerInterceptor)
  remove(@Param('id') id: string) {
    return this.helpService.remove(id);
  }
}
