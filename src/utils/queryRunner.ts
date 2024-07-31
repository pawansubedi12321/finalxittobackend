import { AppDataSource } from '../config/database.config';

export const transactionRunner = AppDataSource.createQueryRunner();

// lets now open a new transaction:
// await queryRunner.startTransaction()
//
// try {
//     // execute some operations on this transaction:
//     await queryRunner.manager.save(user1)
//     await queryRunner.manager.save(user2)
//     await queryRunner.manager.save(photos)
//
//     // commit transaction now:
//     await queryRunner.commitTransaction()
// } catch (err) {
//     // since we have errors let's rollback changes we made
//     await queryRunner.rollbackTransaction()
// } finally {
//     // you need to release query runner which is manually created:
//     await queryRunner.release()
// }
