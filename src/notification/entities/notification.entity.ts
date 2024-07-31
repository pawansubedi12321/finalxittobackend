import { GenericEntity } from "src/core/generic.entity";
import { Column, Entity } from "typeorm";

@Entity('notification')
export class Notification extends GenericEntity {
    @Column()
    notification : string

    @Column()
    type: string
}
