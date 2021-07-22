import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AcceptedJob, Job, NewJob } from 'src/entities';
import { JobService } from './services/job.service';
import { JobController } from './controllers/job.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Job, AcceptedJob, NewJob])],
    providers: [JobService],
    controllers: [JobController],
})
export class JobModule {}
