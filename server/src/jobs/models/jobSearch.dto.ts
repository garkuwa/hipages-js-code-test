import { IsNotEmpty } from 'class-validator';

export class JobSearchDto {
    @IsNotEmpty({
        message: 'The status param is required',
    })
    status: string;
}
