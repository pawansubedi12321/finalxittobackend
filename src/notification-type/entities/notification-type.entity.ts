import { GenericEntity } from "src/core/generic.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity('notification-type')
export class NotificationType extends GenericEntity {
    @Column({unique: true})
    title : string

    @Column({default: true})
    active : Boolean

    @Column({unique: true})
    code : string
}
