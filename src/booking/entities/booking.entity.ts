import { Brand } from "src/brand/entities/brand.entity";
import { GenericEntity } from "src/core/generic.entity";
import { Problem } from "src/problems/entities/problem.entity";
import { User } from "src/users/entities/user.entity";
import { BookingStatus } from "src/utils/enum/bookingStatus";
import { Role } from "src/utils/enum/role.enum";
import { TransactionMode } from "src/utils/enum/transactionMode.enum";
import { TransactionStatus } from "src/utils/enum/transactionStatus";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne } from "typeorm";


@Entity('bookings')
export class Booking extends GenericEntity{
    @ManyToOne(() => User,)
    @JoinColumn({name: 'user_id',})
    bookedBy: string;

    @ManyToOne(() => Problem,)
    @JoinColumn({name: 'problem_id',})
    bookedProblem: string;
    
    @Column({nullable: true})
    selectedBrand: string;

    @ManyToOne(() => User,{nullable: true})
    @JoinColumn({name: 'worker_id',})
    assignTo: string;
    
    @Column({nullable: true})
    bookedDate: string 

    @Column()
    itemCount: number

    @Column({nullable: true})
    completedDate: string

    @Column()
    timePeriod: string
  
    @Column()
    location: string
        
    @Column()
    problemInterval: string

    @Column()
    description: string
    @Column({default: BookingStatus.APPOINT})
    status: string  
    @Column()
    orderId: string  

    @Column({default : TransactionMode.CASH})
    transactionMode : string
}
