import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Category } from './Category';
import { Specification } from './Specification';

@Entity('cars')
export class Car {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  name: string;

  @Column('varchar')
  description: string;

  @Column('numeric')
  daily_rate: number;

  @Column({ type: 'boolean', default: true })
  available: boolean;

  @Column('varchar')
  license_plate: string;

  @Column('numeric')
  fine_amount: number;

  @Column('varchar')
  brand: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column({ nullable: true })
  category_id: string;

  @ManyToMany(() => Specification)
  @JoinTable({
    name: 'specifications_cars',
    joinColumns: [{ name: 'car_id' }],
    inverseJoinColumns: [{ name: 'specification_id' }],
  })
  specifications: Specification[];
}
