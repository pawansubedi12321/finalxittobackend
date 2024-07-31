import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, ClassSerializerInterceptor, UseGuards, UploadedFile } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ResponseMessage } from 'src/core/decorators/response.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt_auth.guards';
import { RolesGuard } from 'src/auth/guards/role_guard';
import { HasRoles } from 'src/core/decorators/has-role.decorator';
import { Role } from 'src/utils/enum/role.enum';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('categories')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @Post('create')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HasRoles(Role.ADMIN)
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        name: {
          type: "string",
          example: "Plumber",
          description: "This is a xitto services category name"
        }
      }
    }
  })
  @ResponseMessage("Category added successfully")
  @UseInterceptors(FileInterceptor('image'))
  @UseInterceptors(ClassSerializerInterceptor)
  create(@UploadedFile() image: Express.Multer.File, @Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(image, createCategoryDto);
  }


  @Get('all')
  // @UseGuards(JwtAuthGuard)
  @ResponseMessage("Category fetched successfully")
  @UseInterceptors(ClassSerializerInterceptor)
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HasRoles(Role.ADMIN)
  @ResponseMessage("Category deleted successfully")
  @UseInterceptors(ClassSerializerInterceptor)
  remove(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }
}
