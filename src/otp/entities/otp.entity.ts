// import { GenericEntity } from "src/utils/generic.entity";
import { GenericEntity } from "src/core/generic.entity";
import { Column, Entity } from "typeorm";

@Entity('otp')
export class Otp extends GenericEntity{
    @Column()
    phone_number : string;

    @Column()
    otp : string
}
