import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, ClassSerializerInterceptor, Req, Query } from '@nestjs/common';
import { AssistanceService } from './assistance.service';
import { CreateAssistanceDto } from './dto/create-assistance.dto';
import { UpdateAssistanceDto } from './dto/update-assistance.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt_auth.guards';
import { RolesGuard } from 'src/auth/guards/role_guard';
import { HasRoles } from 'src/core/decorators/has-role.decorator';
import { Role } from 'src/utils/enum/role.enum';
import { ResponseMessage } from 'src/core/decorators/response.decorator';
import { log } from 'console';

@Controller('assistance')
export class AssistanceController {
  constructor(private readonly assistanceService: AssistanceService) {}

  @Post('create')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HasRoles(Role.USER, Role.WORKER)
  @ResponseMessage('Successfully applied')
  @UseInterceptors(ClassSerializerInterceptor)
  create(@Req() req: any,@Body() createAssistanceDto: CreateAssistanceDto) {
    return this.assistanceService.create(createAssistanceDto, req.user);
  }

  @Get('all')
  @UseGuards(JwtAuthGuard,RolesGuard)
  @HasRoles(Role.ADMIN, Role.WORKER)
  @ResponseMessage('Assistance List fetched successfully ')
  @UseInterceptors(ClassSerializerInterceptor)
  findAll(@Req() req: any, @Query() query : any) {    
    return this.assistanceService.findAll(req.user, query);
  }


  @Get('my')
  @UseGuards(JwtAuthGuard)
  @ResponseMessage('Assistance List fetched successfully ')
  @UseInterceptors(ClassSerializerInterceptor)
  myAssistance(@Req() req: any, @Query() query : any) {    
    return this.assistanceService.myAssistance(req.user, query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.assistanceService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HasRoles(Role.WORKER,Role.ADMIN)
  @ResponseMessage('Successfully updated')
  @UseInterceptors(ClassSerializerInterceptor)
  update(@Param('id') id: string, @Body() updateAssistanceDto: any, @Req() req: any) {    
    return this.assistanceService.updateAssistnce(id, updateAssistanceDto, req.user);
  }

  @Patch('approve/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HasRoles(Role.ADMIN)
  @ResponseMessage('Successfully updated')
  @UseInterceptors(ClassSerializerInterceptor)
  approveAssistance(@Param('id') id: string, @Query() query ,@Body() updateAssistanceDto: any) {
    return this.assistanceService.approve(id, updateAssistanceDto, query);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.assistanceService.remove(+id);
  }
}
