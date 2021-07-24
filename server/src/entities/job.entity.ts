import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, AfterLoad } from 'typeorm';
import { Category } from './category.entity';
import { Suburb } from './suburb.entity';

@Entity({ name: 'jobs' })
export class Job {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    status: string;

    @OneToOne(() => Suburb, { eager: true })
    @JoinColumn({ name: 'suburb_id' })
    suburb: Suburb | string;

    @OneToOne(() => Category, { eager: true })
    @JoinColumn({ name: 'category_id' })
    category: Category | string;

    @Column()
    price: string;

    @Column()
    description: string;

    @Column({ name: 'created_at' })
    createdAt: Date;

    /**
     * Front-end at the moment is not interested in suburb_id and category_id,
     * so there is no reason to include these fields in a response and have a nested structure.
     * It seems a typeorm mysql driver doesn't provide a more elegant way to configure join columns
     * or calculate these fields without using a query builder,
     * which has a drawback of keeping all the field names in a SQL query string
     */
    @AfterLoad()
    setJoinedFields(): void {
        const suburbName = (this.suburb as Suburb).name;
        const categoryName = (this.category as Category).name;

        if (suburbName) this.suburb = suburbName;
        if (categoryName) this.category = categoryName;
    }
}
