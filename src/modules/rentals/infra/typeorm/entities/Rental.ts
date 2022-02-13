import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('rentals')
export class Rental {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    car_id: string;

    @Column()
    user_id: string;

    @Column()
    start_date: Date;

    @Column()
    end_date: Date;

    @Column()
    expected_return_date: Date;

    @Column()
    total: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}