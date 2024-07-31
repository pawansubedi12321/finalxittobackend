import { Category } from "src/category/entities/category.entity";
import { GenericEntity } from "src/core/generic.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity('assistance')
export class Assistance extends GenericEntity{
    @ManyToOne(() => User,)
    @JoinColumn({name: 'user_id',})
    user: string;
    
    @Column()
    availability: string

    @Column()
    level_of_assistance: string

    @Column()
    daily_bill: string

    @Column()
    experience: string

    @ManyToOne(() => Category,)
    @JoinColumn({name: 'category_id',})
    category: string;

    @Column({default : false})
    active: Boolean

    
    @Column({default : false})
    approved: Boolean
}
