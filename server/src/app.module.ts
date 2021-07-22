import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobModule } from './jobs';
import { AcceptedJob, Category, Job, NewJob, Suburb } from './entities';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'hipages',
            database: 'hipages',
            entities: [Category, Suburb, Job, NewJob, AcceptedJob],
        }),
        JobModule,
    ],
})
export class AppModule {}
