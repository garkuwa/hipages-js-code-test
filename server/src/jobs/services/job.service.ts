import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NewJob } from 'src/entities/newJob.entity';
import { Repository, UpdateResult } from 'typeorm';
import { AcceptedJob, Job } from '../../entities';
import { JobStatus } from 'src/models';

@Injectable()
export class JobService {
    constructor(
        @InjectRepository(Job) private jobRepository: Repository<Job>,
        @InjectRepository(NewJob) private newJobRepository: Repository<NewJob>,
        @InjectRepository(AcceptedJob) private acceptedJobRepository: Repository<AcceptedJob>,
    ) {}

    getNewJobs(): Promise<Job[]> {
        return this.newJobRepository.find({
            where: {
                status: JobStatus.NEW,
            },
        });
    }

    getAcceptedJobs(): Promise<Job[]> {
        return this.acceptedJobRepository.find({
            where: {
                status: JobStatus.ACCEPTED,
            },
        });
    }

    getDeclinedJobs(): Promise<Job[]> {
        return this.jobRepository.find({
            where: {
                status: JobStatus.DECLINED,
            },
        });
    }

    updateJobStatus(id: number, newStatus: JobStatus): Promise<UpdateResult> {
        return this.newJobRepository.update({ id }, { status: newStatus });
    }
}
