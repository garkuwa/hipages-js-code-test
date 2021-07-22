import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { JobModule } from './jobs';
import { AcceptedJob, Category, Job, NewJob, Suburb } from './entities';

const env = require('dotenv-flow').config({ silent: true });

if (env.error) {
    throw env.error;
}
process.env = {
    ...process.env,
    // eslint-disable.env.d-next-line global-require
    ...require('dotenv-parse-variables')(env.parsed),
};

const dbConfig = {
    type: process.env.DB_CONNECTION_TYPE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [Category, Suburb, Job, NewJob, AcceptedJob],
} as TypeOrmModuleOptions;
@Module({
    imports: [TypeOrmModule.forRoot(dbConfig), JobModule],
})
export class AppModule {}
