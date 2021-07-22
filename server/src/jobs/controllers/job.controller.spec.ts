import { JobController } from './job.controller';
import { JobService } from '../services/job.service';
import { JobStatus } from 'src/models';
import { Job, AcceptedJob, NewJob } from 'src/entities';
import { Repository, UpdateResult } from 'typeorm';
import { HttpException } from '@nestjs/common';

const NEW_JOBS_MOCK = [
    {
        id: 1,
        status: JobStatus.NEW,
        price: '20',
        description: 'test',
        name: 'Jabba',
        suburb: 'Sydney',
        category: 'Bathroom Renovation',
        createdAt: new Date(),
        setJoinedFields: null,
    } as NewJob,
];
const ACCEPTED_JOBS_MOCK = [
    {
        id: 2,
        status: JobStatus.ACCEPTED,
        price: '11',
        description: 'second test',
        name: 'Jabba',
        suburb: 'Sydney',
        category: 'Bathrofg Lutvih',
        createdAt: new Date(),
        setJoinedFields: null,
        phoneNumber: '12345',
        email: 'test@mail.com',
    } as AcceptedJob,
];

const DECLINED_JOBS_MOCK = [
    {
        id: 3,
        status: JobStatus.ACCEPTED,
        price: '11',
        description: 'third test',
        name: 'Free',
        suburb: 'Sydney',
        category: 'Adam Lutvih',
        createdAt: new Date(),
        setJoinedFields: null,
        phoneNumber: '54321',
        email: 'test100@mail.com',
    } as Job,
];

const jobUpdateData = (id, newStatus) => ({ raw: { id, newStatus } } as UpdateResult);
const jobUpdateDataMock = (id, newStatus) =>
    Promise.resolve(jobUpdateData(id, newStatus)) as Promise<UpdateResult>;

describe('JobController', () => {
    let jobController: JobController;
    let jobService: JobService;
    let jobRepository: Repository<Job>;
    let acceptedJobRepository: Repository<AcceptedJob>;
    let newJobRepository: Repository<NewJob>;

    beforeEach(async () => {
        jobService = new JobService(jobRepository, newJobRepository, acceptedJobRepository);
        jobController = new JobController(jobService);
    });

    describe('getJobsByCategory should return data', () => {
        it('should return an array of new jobs', async () => {
            jest.spyOn(jobService, 'getNewJobs').mockImplementation(() =>
                Promise.resolve(NEW_JOBS_MOCK),
            );

            expect(await jobController.getJobsByStatus(JobStatus.NEW)).toBe(NEW_JOBS_MOCK);
        });

        it('should return an array of accepted jobs', async () => {
            jest.spyOn(jobService, 'getAcceptedJobs').mockImplementation(() =>
                Promise.resolve(ACCEPTED_JOBS_MOCK),
            );

            expect(await jobController.getJobsByStatus(JobStatus.ACCEPTED)).toBe(
                ACCEPTED_JOBS_MOCK,
            );
        });

        it('should return an array of declined jobs', async () => {
            jest.spyOn(jobService, 'getDeclinedJobs').mockImplementation(() =>
                Promise.resolve(DECLINED_JOBS_MOCK),
            );

            expect(await jobController.getJobsByStatus(JobStatus.DECLINED)).toBe(
                DECLINED_JOBS_MOCK,
            );
        });

        it('should throw an error if a nonexistent job status is passed', async () => {
            jest.spyOn(jobService, 'getDeclinedJobs').mockImplementation(() =>
                Promise.resolve(DECLINED_JOBS_MOCK),
            );

            expect(() => jobController.getJobsByStatus('nonexistent')).toThrowError(HttpException);
        });
    });

    describe('acceptJob should update data', () => {
        it('should accept a job', async () => {
            jest.spyOn(jobService, 'updateJobStatus').mockImplementation(id =>
                jobUpdateDataMock(id, JobStatus.ACCEPTED),
            );

            expect(await jobController.acceptJob(100)).toEqual(
                jobUpdateData(100, JobStatus.ACCEPTED),
            );
        });
    });

    describe('decline job should update data', () => {
        it('should decline a job', async () => {
            jest.spyOn(jobService, 'updateJobStatus').mockImplementation(id =>
                jobUpdateDataMock(id, JobStatus.DECLINED),
            );

            expect(await jobController.acceptJob(200)).toEqual(
                jobUpdateData(200, JobStatus.DECLINED),
            );
        });
    });
});
