import {
  Entity,
  Column,
  PrimaryColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Enrollment } from '../../info/enrollment/enrollment.entity';

@Entity('students')
export class Student {
  @PrimaryColumn('char', { length: 10 })
  ID: string;

  @Column('varchar', { length: 255 })
  Name: string;

  @Column('varchar', { length: 255 })
  Password: string;

  @Column('varchar', { length: 10 })
  Gender: string;

  @Column('int')
  Age: number;

  @Column('char', { length: 10 })
  ClassID: string;

  @Column('varchar', { length: 255 })
  ClassName: string;

  @Column('float')
  EnrolledCredits: number;

  @Column('float')
  CompletedCredits: number;

  @Column('int', { default: 3 })
  Permission: number;

  @Column('boolean', { default: false })
  IsDeleted: boolean;

  @CreateDateColumn()
  CreatedAt: Date;

  @UpdateDateColumn({ type: 'timestamp', onUpdate: 'CURRENT_TIMESTAMP' })
  UpdatedAt: Date;

  @OneToMany(() => Enrollment, (enrollment) => enrollment.student)
  enrollments: Enrollment[];
}
