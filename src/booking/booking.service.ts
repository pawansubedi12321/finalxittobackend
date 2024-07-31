import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { Repository } from 'typeorm';
import { BookingDto } from './dto/booking.dto';
import { TransactionService } from 'src/transaction/transaction.service';
import { use } from 'passport';
import { FilterBookingDto } from './dto/filterbooking.dto';
import { log } from 'console';
import { BookingStatus } from 'src/utils/enum/bookingStatus';
import { Assistance } from 'src/assistance/entities/assistance.entity';
import { Role } from 'src/utils/enum/role.enum';
import { User } from 'src/users/entities/user.entity';
import { retry } from 'rxjs';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking) private readonly bookingRepo: Repository<Booking>,
    @InjectRepository(Assistance) private readonly assistanceRepo: Repository<Assistance>,
    private transactionService: TransactionService,
  ) { }
  async create(bookingDto: BookingDto, userId: string) {
    try {
      let bookingDetails = bookingDto.bookingDetails;
      let paymentDetails = bookingDto.paymentDetails;
      let nBooking = await this.bookingRepo.create({ ...bookingDetails, bookedBy: userId, orderId: generateUniqueString(),location : JSON.stringify(bookingDetails.location)});
      let saveBooking = await this.bookingRepo.save(nBooking);
      // return saveBooking.assignTo;
      let sTransaction = await this.transactionService.create({ ...paymentDetails, booking: saveBooking.id });
      return { saveBooking, sTransaction };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(userId: string, role: String) {
    try {
      let queryBuilder = this.bookingRepo.createQueryBuilder('booking').orderBy('booking.created_at', 'DESC').leftJoinAndSelect('booking.assignTo', 'assignTo').leftJoinAndSelect("booking.bookedProblem", "problem").leftJoinAndSelect("problem.category", "category");
      if (role != Role.ADMIN) {
        queryBuilder = queryBuilder.where('booking.bookedBy = :userId', { userId: userId }).leftJoinAndSelect('booking.bookedBy', 'bookedBy');
      } else {
        queryBuilder = queryBuilder.leftJoinAndSelect('booking.bookedBy', 'bookedBy');
      }
      let bookings = await queryBuilder.getMany();
      return bookings.map((data) => {
        let assignTo;
        let bookedProblem;
        let bookedBy;
        if (data.assignTo != null) {
          let user = JSON.stringify(data.assignTo);
          let realData = JSON.parse(user);
          realData.profile_url = `${process.env.BASE_URL}${realData.profile_url}`;
          assignTo = JSON.stringify({ id: realData.id, name: realData.name, phone: realData.phone, profile_url: realData.profile_url });
        }

        if (data.bookedBy != null) {
          let user = JSON.stringify(data.bookedBy);
          let realData = JSON.parse(user);
          realData.profile_url = `${process.env.BASE_URL}${realData.profile_url}`;
          bookedBy = JSON.stringify({ name: realData.name, phone: realData.phone, profile_url: realData.profile_url });
        }
        console.log(data.bookedProblem);

        if (data.bookedProblem != null) {


          let probl = JSON.stringify(data.bookedProblem);
          let realData = JSON.parse(probl);
          realData.imagePath = `${process.env.BASE_URL}${realData.imagePath}`;
          // if(data.bookedProblem.category)
          let category = realData.category;
          bookedProblem = JSON.stringify({ id: realData.id, imagePath: realData.imagePath, shortDescription: realData.shortDescription, price: realData.price, categoryName : category.name,categoryId : category.id});
        }

        return { ...data, assignTo, bookedProblem, bookedBy };
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }


  async assignToAssistance(userId: string, role: String) {

    try {
      let queryBuilder = this.bookingRepo.createQueryBuilder('booking').orderBy('booking.created_at', 'DESC').leftJoinAndSelect('booking.assignTo', 'assignTo').leftJoinAndSelect("booking.bookedProblem", "problem").leftJoinAndSelect("problem.category", "category");
      if (role != Role.ADMIN) {
        queryBuilder = queryBuilder.where('booking.assignTo = :userId', { userId: userId }).leftJoinAndSelect('booking.bookedBy', 'bookedBy');
      } 
      let bookings = await queryBuilder.getMany();
      return bookings.map((data) => {
        let assignTo;
        let bookedProblem;
        let bookedBy;
        if (data.assignTo != null) {
          let user = JSON.stringify(data.assignTo);
          let realData = JSON.parse(user);
          realData.profile_url = `${process.env.BASE_URL}${realData.profile_url}`;
          assignTo = JSON.stringify({ id: realData.id, name: realData.name, phone: realData.phone, profile_url: realData.profile_url });
        }

        if (data.bookedBy != null) {
          let user = JSON.stringify(data.bookedBy);
          let realData = JSON.parse(user);
          realData.profile_url = `${process.env.BASE_URL}${realData.profile_url}`;
          bookedBy = JSON.stringify({ name: realData.name, phone: realData.phone, profile_url: realData.profile_url });
        }
        console.log(data.bookedProblem);

        if (data.bookedProblem != null) {


          let probl = JSON.stringify(data.bookedProblem);
          let realData = JSON.parse(probl);
          realData.imagePath = `${process.env.BASE_URL}${realData.imagePath}`;
          // if(data.bookedProblem.category)
          let category = realData.category;
          bookedProblem = JSON.stringify({ id: realData.id, imagePath: realData.imagePath, shortDescription: realData.shortDescription, price: realData.price, categoryName : category.name,categoryId : category.id});
        }

        return { ...data, assignTo, bookedProblem, bookedBy };
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async filterBooking(userId: string, filterDto: FilterBookingDto, role: string) {
    // return filterDto.assignTo;
    try {
      let queryBuilder = this.bookingRepo.createQueryBuilder('booking').orderBy('booking.created_at', 'DESC').leftJoinAndSelect('booking.assignTo', 'assignTo').leftJoinAndSelect("booking.bookedProblem", "problem").leftJoinAndSelect("problem.category", "category");
      if (role != Role.ADMIN) {
        queryBuilder = queryBuilder.where('booking.bookedBy = :userId', { userId: userId }).leftJoinAndSelect('booking.bookedBy', 'bookedBy');
      } else {
        queryBuilder = queryBuilder.leftJoinAndSelect('booking.bookedBy', 'bookedBy');
      }

      if (filterDto.status != null && filterDto.status != '') {
        queryBuilder.andWhere('booking.status = :status', { status: filterDto.status })
      }

      if (filterDto.location != null && filterDto.location != '') {
        queryBuilder.andWhere('LOWER(booking.location) ILIKE :location', { location: `%${filterDto.location.toLowerCase()}%` })
      }

      if (filterDto.itemCount != null && filterDto.itemCount != '') {
        queryBuilder.andWhere('booking.itemCount = :itemCount', { itemCount: filterDto.itemCount })
      }

      if (filterDto.timePeriod != null && filterDto.timePeriod != '') {
        queryBuilder.andWhere('LOWER(booking.timePeriod) ILIKE :timePeriod', { timePeriod: `%${filterDto.timePeriod.toLowerCase()}%` })
      }

      if (filterDto.problemInterval != null && filterDto.problemInterval != '') {
        queryBuilder.andWhere('LOWER(booking.problemInterval) ILIKE :problemInterval', { problemInterval: `%${filterDto.problemInterval.toLowerCase()}%` })
      }

      if (filterDto.transactionMode != null && filterDto.transactionMode != '') {
        queryBuilder.andWhere('booking.transactionMode = :transactionMode', { transactionMode: filterDto.transactionMode.toLowerCase() })
      }


      let bookings = await queryBuilder.getMany();
      return bookings.map((data) => {
        let assignTo;
        let bookedProblem;
        let bookedBy;
        if (data.assignTo != null) {
          let user = JSON.stringify(data.assignTo);
          let realData = JSON.parse(user);
          realData.profile_url = `${process.env.BASE_URL}${realData.profile_url}`;
          assignTo = JSON.stringify({ id: realData.id, name: realData.name, phone: realData.phone, profile_url: realData.profile_url });
        }

        if (data.bookedBy != null) {
          let user = JSON.stringify(data.bookedBy);
          let realData = JSON.parse(user);
          realData.profile_url = `${process.env.BASE_URL}${realData.profile_url}`;
          bookedBy = JSON.stringify({ name: realData.name, phone: realData.phone, profile_url: realData.profile_url });
        }
        console.log(data.bookedProblem);

        if (data.bookedProblem != null) {


          let probl = JSON.stringify(data.bookedProblem);
          let realData = JSON.parse(probl);
          realData.imagePath = `${process.env.BASE_URL}${realData.imagePath}`;
          // if(data.bookedProblem.category)
          let category = realData.category;
          bookedProblem = JSON.stringify({ id: realData.id, imagePath: realData.imagePath, shortDescription: realData.shortDescription, price: realData.price, categoryName : category.name,categoryId : category.id});
        }

        return { ...data, assignTo, bookedProblem, bookedBy };
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} booking`;
  }

  async update(id: string, updateBookingDto: UpdateBookingDto) {
    try {
      let booking = await this.bookingRepo.createQueryBuilder("booking").leftJoinAndSelect("booking.assignTo", "assignTo").where("booking.id = :id", { id: id }).getOne();
      if (booking.status == BookingStatus.COMPLETED) {
        throw new Error("You cannot change completed booking");
      }
      if (updateBookingDto.status != null) {
        if (!(Object.values({ ...BookingStatus }).includes(updateBookingDto.status))) {
          throw new Error("Please select a valid status");
        }
      }

      if (updateBookingDto.status == BookingStatus.ONGOING) {
        if (updateBookingDto.assignTo == null) {
          throw new HttpException("Please assign a worker", HttpStatus.BAD_REQUEST);
        }


        let isUserHasAActiveWorke = await this.assistanceRepo.createQueryBuilder("assistance").leftJoinAndSelect("assistance.user", "user").where('user.id = :userId', { userId: updateBookingDto.assignTo }).andWhere("assistance.active = :active", { active: true }).getOne();
        console.log(isUserHasAActiveWorke);

        if (!isUserHasAActiveWorke) {
          throw new HttpException("Selected user has not active work", HttpStatus.BAD_REQUEST);
        }
      }
      if (updateBookingDto.status == BookingStatus.COMPLETED) {
        if (booking.assignTo == null) {
          throw new HttpException("Please complete a task", HttpStatus.BAD_REQUEST);
        }
      }
      if (updateBookingDto.status == BookingStatus.COMPLETED) {
        if (updateBookingDto.assignTo != null) {
          throw new HttpException("You can't assign a worker", HttpStatus.BAD_REQUEST);
        }
      }
      let updatePost = await this.bookingRepo.createQueryBuilder('booking').update(Booking).set(updateBookingDto).where('id = :id', { id: id }).execute();
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} booking`;
  }


  //get assistance count
  async getAssistanceCount(userId: string){
    let ongoing;
    let completed;
    let queryBuilder = this.bookingRepo.createQueryBuilder('booking').orderBy('booking.created_at', 'DESC').leftJoinAndSelect('booking.assignTo', 'assignTo').where('booking.assignTo = :userId', { userId: userId });
    ongoing = await queryBuilder.andWhere("booking.status = :status", {status : "ongoing"}).getCount();
    completed = await queryBuilder.andWhere("booking.status = :status", {status : "completed"}).getCount(); 
    return {
      ongoing,
      completed
    }

  }




  //filter by assisyance
async filterBookingByAssistance(userId: string, filterDto: FilterBookingDto, role: string) {

  // return filterDto.assignTo;
  
  try {
    let queryBuilder = this.bookingRepo.createQueryBuilder('booking').orderBy('booking.created_at', 'DESC').leftJoinAndSelect('booking.assignTo', 'assignTo').leftJoinAndSelect("booking.bookedProblem", "problem").leftJoinAndSelect("problem.category", "category");
    if (role != Role.ADMIN) {
      queryBuilder = queryBuilder.where('booking.assignTo = :userId', { userId: userId }).leftJoinAndSelect('booking.bookedBy', 'bookedBy');
    } else {
      queryBuilder = queryBuilder.leftJoinAndSelect('booking.bookedBy', 'bookedBy');
    }

    if(filterDto.catId != null){
      queryBuilder = queryBuilder.andWhere('category.id = :id', { id: filterDto.catId })
    }

    if (filterDto.status != null && filterDto.status != '') {
      queryBuilder.andWhere('booking.status = :status', { status: filterDto.status })
    }

    if (filterDto.location != null && filterDto.location != '') {
      queryBuilder.andWhere('LOWER(booking.location) ILIKE :location', { location: `%${filterDto.location.toLowerCase()}%` })
    }

    if (filterDto.itemCount != null && filterDto.itemCount != '') {
      queryBuilder.andWhere('booking.itemCount = :itemCount', { itemCount: filterDto.itemCount })
    }

    if (filterDto.timePeriod != null && filterDto.timePeriod != '') {
      queryBuilder.andWhere('LOWER(booking.timePeriod) ILIKE :timePeriod', { timePeriod: `%${filterDto.timePeriod.toLowerCase()}%` })
    }

    if (filterDto.problemInterval != null && filterDto.problemInterval != '') {
      queryBuilder.andWhere('LOWER(booking.problemInterval) ILIKE :problemInterval', { problemInterval: `%${filterDto.problemInterval.toLowerCase()}%` })
    }

    if (filterDto.transactionMode != null && filterDto.transactionMode != '') {
      queryBuilder.andWhere('booking.transactionMode = :transactionMode', { transactionMode: filterDto.transactionMode.toLowerCase() })
    }


    let bookings = await queryBuilder.getMany();
    return bookings.map((data) => {
      let assignTo;
      let bookedProblem;
      let bookedBy;
      if (data.assignTo != null) {
        let user = JSON.stringify(data.assignTo);
        let realData = JSON.parse(user);
        realData.profile_url = `${process.env.BASE_URL}${realData.profile_url}`;
        assignTo = JSON.stringify({ id: realData.id, name: realData.name, phone: realData.phone, profile_url: realData.profile_url });
      }

      if (data.bookedBy != null) {
        let user = JSON.stringify(data.bookedBy);
        let realData = JSON.parse(user);
        realData.profile_url = `${process.env.BASE_URL}${realData.profile_url}`;
        bookedBy = JSON.stringify({ name: realData.name, phone: realData.phone, profile_url: realData.profile_url });
      }
      console.log(data.bookedProblem);

      if (data.bookedProblem != null) {
        let probl = JSON.stringify(data.bookedProblem);
        let realData = JSON.parse(probl);
        realData.imagePath = `${process.env.BASE_URL}${realData.imagePath}`;
        // if(data.bookedProblem.category)
        let category = realData.category;
        bookedProblem = JSON.stringify({ id: realData.id, imagePath: realData.imagePath, shortDescription: realData.shortDescription, price: realData.price, categoryName : category.name,categoryId : category.id});
      }

      return { ...data, assignTo, bookedProblem, bookedBy };
    });
  } catch (error) {
    throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
  }
}
}


function generateUniqueString(): string {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < 10; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}





