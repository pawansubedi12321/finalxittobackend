import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category) private readonly catRepo: Repository<Category>,
  ) { }
  async create(image: Express.Multer.File, createCategoryDto: CreateCategoryDto) {
    try {
      if (image == null) {
        throw new HttpException("Please select a image", HttpStatus.BAD_REQUEST);
      }
      let nCategory = await this.catRepo.create({
        imagePath: image.path,
        name: createCategoryDto.name
      },);
      return await this.catRepo.save(nCategory);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    try {
     let categories = await this.catRepo.createQueryBuilder('category').getMany();
     let updatedCategory = categories.map((elemet)=>{
      elemet.imagePath = `${process.env.BASE_URL}/${elemet.imagePath}`;
      return elemet;
     });
     return updatedCategory; 
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST); 
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  async remove(id: string) {
    try {
      let deleteData= await this.catRepo.createQueryBuilder("categories").delete().from(Category).where('id = :id', { id: id }).execute();
      if(deleteData.affected==0){
       throw new HttpException("Error on deleting category", HttpStatus.BAD_REQUEST);
      }
      return;
      } catch (error) {
       throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
    // return `This action removes a #${id} category`;
  }
}
