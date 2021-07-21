import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobModule } from './jobs';
import { Category, Job, Suburb } from './entities';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'hipages',
            database: 'hipages',
            entities: [Category, Job, Suburb],
        }),
        JobModule,
    ],
})
export class AppModule {}
