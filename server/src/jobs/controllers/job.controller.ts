import {
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Param,
    ParseIntPipe,
    Put,
} from '@nestjs/common';
import { JobService } from '../services/job.service';
import { Job } from '../../entities';
import { JobStatus } from 'src/models';
import { UpdateResult } from 'typeorm';

@Controller('jobs')
export class JobController {
    constructor(private readonly jobService: JobService) {}

    @Get(':status')
    getJobsByStatus(@Param('status') status: string): Promise<Job[]> {
        switch (status) {
            case JobStatus.NEW:
                return this.jobService.getNewJobs();
            case JobStatus.ACCEPTED:
                return this.jobService.getAcceptedJobs();
            case JobStatus.DECLINED:
                return this.jobService.getDeclinedJobs();
            default:
                throw new HttpException(
                    'Invalid value of the status param has been passed',
                    HttpStatus.NOT_ACCEPTABLE,
                );
        }
    }

    @Put('accept/:id')
    acceptJob(
        @Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }))
        id: number,
    ): Promise<UpdateResult> {
        return this.jobService.updateJobStatus(id, JobStatus.ACCEPTED);
    }

    @Put('decline/:id')
    declineJob(
        @Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }))
        id: number,
    ): Promise<UpdateResult> {
        return this.jobService.updateJobStatus(id, JobStatus.DECLINED);
    }
}
