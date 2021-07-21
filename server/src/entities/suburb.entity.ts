import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'suburbs' })
export class Suburb {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}
