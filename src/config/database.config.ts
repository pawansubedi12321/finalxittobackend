import 'dotenv/config';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  //typeorm config
  type: 'postgres',
  host: process.env.DATABASE_HOST ,
  port: parseInt(process.env.DATABASE_PORT) ,
  username: process.env.DATABASE_USER ,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : false,
  entities: ['dist/**/*.entity.js'],
  logging: true,
  synchronize: true,
});
