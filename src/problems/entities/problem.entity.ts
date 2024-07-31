import { Brand } from "src/brand/entities/brand.entity";
import { Category } from "src/category/entities/category.entity";
import { GenericEntity } from "src/core/generic.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";

@Entity('problems')
export class Problem extends GenericEntity {
    @ManyToOne(() => Category,)
    @JoinColumn({ name: 'category_id', })
    category: string;

    @Column({unique: true})
    name: string

    @Column()
    price: string

    @Column()
    estTime: string

    @Column()
    imagePath: string

    @Column()
    shortDescription: string

    @OneToMany(()=> Brand, (brand) => brand.problem,{ onDelete: 'CASCADE' })
    brands: Brand[]
}
