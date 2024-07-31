import { GenericEntity } from "src/core/generic.entity";
import { Column, Entity } from "typeorm";

@Entity('social-media')
export class SocialMedia extends GenericEntity{
    @Column({ unique: true })
    name: string
 
    @Column()
    link: string

}
