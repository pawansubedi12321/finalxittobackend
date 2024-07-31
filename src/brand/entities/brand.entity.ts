import { GenericEntity } from "src/core/generic.entity";
import { Problem } from "src/problems/entities/problem.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity('brands')
export class Brand extends GenericEntity {
    @ManyToOne(() => Problem,{ onDelete: 'CASCADE' })
    @JoinColumn({ name: 'problem_id', })
    problem: string;
    
    @Column()
    name: string
}
