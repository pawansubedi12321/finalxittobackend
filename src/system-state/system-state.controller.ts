import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SystemStateService } from './system-state.service';
import { CreateSystemStateDto } from './dto/create-system-state.dto';
import { UpdateSystemStateDto } from './dto/update-system-state.dto';
import { ResponseMessage } from 'src/core/decorators/response.decorator';

@Controller('system-state')
export class SystemStateController {
  constructor(private readonly systemStateService: SystemStateService) {}

  @Post()
  create(@Body() createSystemStateDto: CreateSystemStateDto) {
    return this.systemStateService.create(createSystemStateDto);
  }

  @Get()
  findAll() {
    return this.systemStateService.findAll();
  }

  @Get('version')
  @ResponseMessage("Version fetch")
  findSyatemVersion() {
    return this.systemStateService.getSystemVersion();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.systemStateService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSystemStateDto: UpdateSystemStateDto) {
    return this.systemStateService.update(+id, updateSystemStateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.systemStateService.remove(+id);
  }
}
