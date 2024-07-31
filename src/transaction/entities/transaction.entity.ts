import { Booking } from "src/booking/entities/booking.entity";
import { GenericEntity } from "src/core/generic.entity";
import { BookingStatus } from "src/utils/enum/bookingStatus";
import { TransactionMode } from "src/utils/enum/transactionMode.enum";
import { TransactionStatus } from "src/utils/enum/transactionStatus";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";


@Entity('transactions')
export class Transaction extends GenericEntity{
    @OneToOne(() => Booking)
    @JoinColumn({ name: 'booking'})
    booking: string;

    @Column()
    totalAmount: Number
    
    @Column({default: 0})
    discountAmount: Number

    @Column({default:0})
    redeemAmount: Number

    @CreateDateColumn()
    transactionDate: string;

    @Column()
    transactionId : string
    
    @Column({default: TransactionStatus.PENDING})
    transactionStatus : string
        
}
