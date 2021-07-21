import { Controller, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { JobService } from '../services';
import { Job } from '../../entities';
import { JobChangeStatusDto, JobSearchDto, JobStatus } from '../models';
import { UpdateResult } from 'typeorm';

@Controller('jobs')
export class CategoryController {
    constructor(private readonly jobService: JobService) {}

    @Get(':status')
    getCategories(@Param() params: JobSearchDto): Promise<Job[]> {
        switch (params.status) {
            case JobStatus.NEW:
                return this.jobService.getNewJobs();
            case JobStatus.ACCEPTED:
                return this.jobService.getAcceptedJobs();
            default:
                throw new HttpException(
                    'Invalid value of the status param has been passed',
                    HttpStatus.BAD_REQUEST,
                );
        }
    }

    @Post('accept/:id')
    acceptJob(@Param() params: JobChangeStatusDto): Promise<UpdateResult> {
        return this.jobService.updateJobStatus(params.id, JobStatus.ACCEPTED);
    }

    @Post('decline:/:id')
    declineJob(@Param() params: JobChangeStatusDto): Promise<UpdateResult> {
        return this.jobService.updateJobStatus(params.id, JobStatus.DECLINED);
    }
}
