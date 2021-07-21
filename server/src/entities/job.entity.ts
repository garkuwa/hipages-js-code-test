import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Category } from './category.entity';
import { Suburb } from './suburb.entity';

@Entity({ name: 'jobs' })
export class Job {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    status: string;

    @OneToOne(() => Suburb)
    @JoinColumn({ name: 'suburb_id' })
    suburb: Suburb;

    @OneToOne(() => Category)
    @JoinColumn({ name: 'category_id' })
    category: Category;

    @Column({ name: 'contact_name' })
    fullName: string;

    @Column({ name: 'contact_phone' })
    phoneNumber: string;

    @Column({ name: 'contact_email' })
    email: string;

    @Column()
    price: string;

    @Column()
    description: string;

    @Column({ name: 'created_at' })
    createdAt: Date;
}
