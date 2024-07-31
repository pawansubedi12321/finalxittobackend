import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAssistanceDto } from './dto/create-assistance.dto';
import { UpdateAssistanceDto } from './dto/update-assistance.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Assistance } from './entities/assistance.entity';
import { Repository } from 'typeorm';
import { Role } from 'src/utils/enum/role.enum';
import { BASE_URL } from 'src/core/constant/constant';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AssistanceService {
  constructor(
    @InjectRepository(Assistance) private readonly assistanceRepo: Repository<Assistance>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ){}
  async create(createAssistanceDto: CreateAssistanceDto, user: any) {
    // return createAssistanceDto;
    try {
      let checkAllready = await this.assistanceRepo.createQueryBuilder('assistance').where('assistance.category = :category',{category: createAssistanceDto.category}).andWhere('assistance.user = :user',{user: user.id}).getOne();
      // return checkAllready;
      if(checkAllready != null){
       throw new HttpException("You have already applied for this service", HttpStatus.BAD_REQUEST);
      }
      await this.userRepo.createQueryBuilder('user').update(User).set({role : Role.WORKER}).where("id = :id", { id: user.id }).execute();
      let nAssistance = await this.assistanceRepo.create({
        ...createAssistanceDto,user: user.id
      },);
      return await this.assistanceRepo.save(nAssistance);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(user: any, query : any) {
    try {
      const { active, page, pageSize } = query;
      const pageNumber = parseInt(page, 10) || 1;
      const size = parseInt(pageSize, 10) || 10; // Default page size is 10

      let queryBuilder = this.assistanceRepo.createQueryBuilder('assistance')
          .leftJoinAndSelect('assistance.category', 'category');

      if (user.role === Role.ADMIN) {
          queryBuilder.leftJoinAndSelect('assistance.user', 'user');
      } else {
          queryBuilder.where('assistance.user = :userId', { userId: user.id });
      }

      if (active !== undefined) {
          queryBuilder = queryBuilder.andWhere('assistance.active = :active', { active });
      }

      // Calculate offset based on page number and page size
      const offset = (pageNumber - 1) * size;

      queryBuilder.skip(offset).take(size);

      const assistances = await queryBuilder.getMany();

      let updateAssistance = assistances.map((element) => {
          element.category['imagePath'] = `${process.env.BASE_URL}${element.category['imagePath']}`;
          return element;
      });

      return {"assistance": updateAssistance,pageNumber,pageSize : size};
  } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
  }
  }


  async myAssistance(user: any, query: any) {
    try {
        const { active, page, pageSize ,approved } = query;
        const pageNumber = parseInt(page, 10) || 1;
        const size = parseInt(pageSize, 10) || 10; // Default page size is 10

        let queryBuilder = this.assistanceRepo.createQueryBuilder('assistance')
            .leftJoinAndSelect('assistance.category', 'category');

        if (user.role === Role.ADMIN) {
            queryBuilder.leftJoin('assistance.user', 'user').addSelect(['user.name', 'user.profile_url', 'user.phone','user.id']);
        } else {
            queryBuilder.where('assistance.user = :userId', { userId: user.id });
        }

        if (active !== undefined) {
            queryBuilder = queryBuilder.andWhere('assistance.active = :active', { active });
        }


        if (approved !== undefined) {
          queryBuilder = queryBuilder.andWhere('assistance.approved = :approved', { approved });
      }

        queryBuilder.orderBy('assistance.created_at', 'DESC');

        // Calculate offset based on page number and page size
        const offset = (pageNumber - 1) * size;
        queryBuilder.skip(offset).take(size);
        // const assistances = await queryBuilder.getMany();
        const [assistances, total] = await queryBuilder.getManyAndCount();
        let updateAssistance = assistances.map((element) => {
            element.category['imagePath'] = `${process.env.BASE_URL}${element.category['imagePath']}`;
            if(element.user != null){
              element.user['profile_url'] = `${process.env.BASE_URL}${element.user['profile_url']}`;
            }
            return element;
        });

        const totalPages = Math.ceil(total / size);
        return {"assistance": updateAssistance,pageNumber,pageSize : size,totalPages};
    } catch (error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
}


  findOne(id: number) {
    return `This action returns a #${id} assistance`;
  }

 async updateAssistnce(id: string, updateAssistanceDto: any, user: any) {
    try {
      let queryBuilder = this.assistanceRepo.createQueryBuilder('assistance');
      if(user.role != Role.ADMIN){
        queryBuilder = queryBuilder.leftJoinAndSelect('assistance.user','user').where('user.id = :userId', {userId : user.id});
      }
      let updateAssistance= await queryBuilder.update(Assistance).andWhere('assistance.id = :id', { id: id }).set({...updateAssistanceDto}).execute();
      
      // let updateAssistance = await this.assistanceRepo.createQueryBuilder('assistance').update(Assistance).set({...updateAssistanceDto}).where('id = :id', { id: id }).execute();
      if(updateAssistance.affected != 0){
        return;
      }else{
      throw new HttpException("Unable to update data", HttpStatus.BAD_REQUEST);
      }
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    } 
  }


  async approve(id: string, updateAssistanceDto: any, query: any) {
    try {
      const status = query.status;
      if (!status) {
        throw new HttpException("Please provide a status", HttpStatus.BAD_REQUEST);
      }

      const approved = convertStringToBoolean(status);

  
      const updateResult = await this.assistanceRepo.createQueryBuilder('assistance')
        .update(Assistance)
        .set({ approved: approved })
        .where('id = :id', { id })
        .execute();
  
      if (updateResult.affected == 0) {
        throw new HttpException("No assistance found with the given ID or no change in status", HttpStatus.NOT_FOUND);
      }
  
      return {
        message: 'Assistance status updated successfully',
        status,
        id,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} assistance`;
  }
}




function convertStringToBoolean(str: string): boolean {
  const trueValues = ["true", "1", "yes"];
  const falseValues = ["false", "0", "no"];

  if (trueValues.includes(str.toLowerCase())) {
    return true;
  } else if (falseValues.includes(str.toLowerCase())) {
    return false;
  } else {
    throw new HttpException("Invalid status value. Acceptable values are 'true', 'false', '1', '0', 'yes', or 'no'", HttpStatus.BAD_REQUEST);
  }
}