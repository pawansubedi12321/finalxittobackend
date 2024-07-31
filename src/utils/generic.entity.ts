import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

export class GenericEntity {
    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
    

}
