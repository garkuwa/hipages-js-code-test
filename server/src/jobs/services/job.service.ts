import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Job } from '../../entities';
import { JobStatus } from '../models';

@Injectable()
export class JobService {
    constructor(@InjectRepository(Job) private jobRepository: Repository<Job>) {}

    /**
     * New and accepted jobs share a set of the same fields,
     * which we return to a user. Accepted jobs have a couple more fields,
     * so we extend this array for the accepted job query
     */
    private readonly jobSelectSharedFields = [
        'job.id AS id',
        'suburb.name AS suburb',
        'category.name AS category',
        'job.description AS description',
        'job.price AS price',
    ];

    private getJobs(fields: string[], status: JobStatus) {
        return this.jobRepository
            .createQueryBuilder('job')
            .leftJoinAndSelect('job.suburb', 'suburb')
            .leftJoinAndSelect('job.category', 'category')
            .select(fields)
            .where('job.status = :status', { status })
            .getRawMany();
    }

    getNewJobs(): Promise<Job[]> {
        return this.getJobs(this.jobSelectSharedFields, JobStatus.NEW);
    }

    getAcceptedJobs(): Promise<Job[]> {
        return this.getJobs(
            [
                ...this.jobSelectSharedFields,
                'job.fullName AS fullName',
                'job.phoneNumber AS phoneNumber',
                'job.email AS email',
            ],
            JobStatus.ACCEPTED,
        );
    }

    updateJobStatus(id: number, newStatus: JobStatus): Promise<UpdateResult> {
        return this.jobRepository.update({ id }, { status: newStatus });
    }
}
