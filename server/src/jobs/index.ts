import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AcceptedJob, Job, NewJob } from 'src/entities';
import { JobService } from './services';
import { CategoryController } from './controllers';

@Module({
    imports: [TypeOrmModule.forFeature([Job, AcceptedJob, NewJob])],
    providers: [JobService],
    controllers: [CategoryController],
})
export class JobModule {}
