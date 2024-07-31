import { GenericEntity } from "src/core/generic.entity";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { User } from "./user.entity";

@Entity('users-details')
export class UserDetails extends GenericEntity {
    @Column()
    gender: string;

    @Column()
    district: string;

    @Column()
    location: string;

    @Column({ default: 0 })
    earnings: number

    @Column()
    refer_code: string

}