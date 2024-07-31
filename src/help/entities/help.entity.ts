import { GenericEntity } from "src/core/generic.entity";
import { Column, Entity } from "typeorm";


@Entity('helps')
export class Help extends GenericEntity{
    @Column()
    question: string

    @Column()
    answer: string
}
