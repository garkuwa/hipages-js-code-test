import { Entity, Column } from 'typeorm';
import { Job } from './job.entity';

@Entity('jobs')
export class AcceptedJob extends Job {
    @Column({ name: 'contact_name' })
    name: string;

    @Column({ name: 'contact_phone' })
    phoneNumber: string;

    @Column({ name: 'contact_email' })
    email: string;
}
