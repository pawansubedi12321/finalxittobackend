import { GenericEntity } from "src/core/generic.entity";
import { Column, Entity } from "typeorm";

@Entity('categories')
export class Category extends GenericEntity {
   @Column({ unique: true })
   name: string

   @Column()
   imagePath: string
}
