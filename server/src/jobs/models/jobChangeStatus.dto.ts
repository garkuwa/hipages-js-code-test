import { IsInt } from 'class-validator';

export class JobChangeStatusDto {
    @IsInt({
        message: 'Job id must be a number',
    })
    id: number;
}
