// course.entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Index,
} from 'typeorm';
import { Enrollment } from '../enrollment/enrollment.entity';

@Entity('courses')
@Index('fk_Courses_College', ['CollegeID'])
@Index('fk_Courses_Teacher', ['TeacherID'])
@Index('fk_Courses_Location', ['LocationID'])
export class Course {
  @PrimaryGeneratedColumn('uuid')
  ID: string;

  @Column('varchar', { length: 255 })
  CourseName: string;

  @Column('varchar', { length: 255 })
  Description: string;

  @Column('float')
  Credits: number;

  @Column('char', { length: 10 })
  CollegeID: string;

  @Column('varchar', { length: 255 })
  CollegeName: string;

  @Column('char', { length: 10 })
  TeacherID: string;

  @Column('varchar', { length: 255 })
  TeacherName: string;

  @Column('int')
  Enrolled: number;

  @Column('int')
  Capacity: number;

  @Column('varchar', { length: 255, nullable: true })
  Schedule?: string;

  @Column('int', { unsigned: true, nullable: true })
  LocationID?: number;

  @Column('varchar', { length: 255, nullable: true })
  Location?: string;

  @CreateDateColumn()
  CreatedAt: Date;

  @UpdateDateColumn()
  UpdatedAt: Date;

  @Column({ type: 'boolean', default: false })
  IsDeleted: boolean;

  @OneToMany(() => Enrollment, (enrollment) => enrollment.course)
  enrollments: Enrollment[];
}
