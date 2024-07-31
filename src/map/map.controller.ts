import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { MapService } from './map.service';
import { CreateMapDto } from './dto/create-map.dto';
import { UpdateMapDto } from './dto/update-map.dto';
import { ResponseMessage } from 'src/core/decorators/response.decorator';

@Controller('map')
export class MapController {
  constructor(private readonly mapService: MapService) {}

  @Post()
  create(@Body() createMapDto: CreateMapDto) {
    return this.mapService.create(createMapDto);
  }

  @Get('/reverse')
  @ResponseMessage("Location fetched")
  reverseCoding(@Query() query : any) {
    return this.mapService.reverseCoding(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mapService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMapDto: UpdateMapDto) {
    return this.mapService.update(+id, updateMapDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mapService.remove(+id);
  }
}
