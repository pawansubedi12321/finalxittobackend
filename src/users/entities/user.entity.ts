import { Exclude } from "class-transformer";
import { GenericEntity } from "src/core/generic.entity";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { UserDetails } from "./userdetails.entity";
import { Role } from "src/utils/enum/role.enum";


@Entity('users')
export class User extends GenericEntity {
    @Column()
    name: string;

    @Column()
    phone: string;

    @Exclude({})
    @Column()
    password: string;

    @Column({nullable: false, default: Role.USER,})
    role: string;

    
    @Column({ nullable: true })
    profile_url: string

    @OneToOne(() => UserDetails,{ eager: true   })
    @JoinColumn({ name: 'user_details'})
    userDetails: UserDetails;
}
