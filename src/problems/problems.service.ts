import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProblemDto } from './dto/create-problem.dto';
import { UpdateProblemDto } from './dto/update-problem.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Problem } from './entities/problem.entity';
import { Repository } from 'typeorm';
import { BASE_URL } from 'src/core/constant/constant';

@Injectable()
export class ProblemsService {
  constructor(
    @InjectRepository(Problem) private readonly problemRepo: Repository<Problem>,
  ) { }
  async create(image: Express.Multer.File, createProblemDto: CreateProblemDto) {
    try {
      if (image == null) {
        throw new HttpException("Please select a image", HttpStatus.BAD_REQUEST);
      }
      let nProblem = await this.problemRepo.create({
        imagePath: image.path,
        ...createProblemDto
      },);
      let saveProblem = await this.problemRepo.save(nProblem);
      saveProblem.imagePath = `${BASE_URL}${saveProblem.imagePath}`;
      return saveProblem;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(catId : string) {
    try {
      let problems = await this.problemRepo.createQueryBuilder('problems').leftJoinAndSelect('problems.brands','brands').where('problems.category = :id',{id: catId}).getMany();
      let updatedProblem = problems.map((elemet)=>{
       elemet.imagePath = `${BASE_URL}/${elemet.imagePath}`;
       return elemet;
      });
      return updatedProblem; 
     } catch (error) {
       throw new HttpException(error.message, HttpStatus.BAD_REQUEST); 
     }
  }

  findOne(id: number) {
    return `This action returns a #${id} problem`;
  }

  update(id: number, updateProblemDto: UpdateProblemDto) {
    return `This action updates a #${id} problem`;
  }

  async remove(id: string) {
    try {
      let deleteData= await this.problemRepo.createQueryBuilder("problem").delete().from(Problem).where('id = :id', { id: id }).execute();
      if(deleteData.affected==0){
       throw new HttpException("Error on deleting problems", HttpStatus.BAD_REQUEST);
      }
      return;
      } catch (error) {
       throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
  }
}
