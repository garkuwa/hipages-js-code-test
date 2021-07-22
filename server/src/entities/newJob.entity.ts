import { Entity, Column } from 'typeorm';
import { ColumnCommonOptions } from 'typeorm/decorator/options/ColumnCommonOptions';
import { ColumnEnumOptions } from 'typeorm/decorator/options/ColumnEnumOptions';
import { Job } from './job.entity';

@Entity('jobs')
export class NewJob extends Job {
    @Column({
        name: 'contact_name',
        transformer: {
            from: (value: string) => value.split(' ')[0],
        },
    } as ColumnCommonOptions & ColumnEnumOptions)
    name: string;
}
