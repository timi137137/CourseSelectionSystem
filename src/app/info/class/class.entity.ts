import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { College } from '../college/college.entity';

@Entity('classes')
export class Class {
  @PrimaryGeneratedColumn('uuid')
  ID: string;

  @Column('varchar', { length: 255 })
  ClassName: string;

  @Column('uuid')
  CollegeID: string;

  @ManyToOne(() => College)
  @JoinColumn({ name: 'CollegeID' })
  College: College;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  CreatedAt: Date;

  @Column('timestamp', {
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  UpdatedAt: Date;

  @Column({ type: 'boolean', default: false })
  IsDeleted: boolean;
}
