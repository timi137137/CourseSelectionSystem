import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Course } from '../course/course.entity';
import { Student } from '../../user/student/student.entity';

@Entity('enrollments')
export class Enrollment {
  @PrimaryColumn('char', { length: 10 })
  CourseID: string;

  @PrimaryColumn('char', { length: 10 })
  StudentID: string;

  @Column('float', { nullable: true })
  Grade: number;

  @Column('boolean', { default: false })
  IsDeleted: boolean;

  @ManyToOne(() => Course, (course) => course.enrollments)
  @JoinColumn({ name: 'CourseID' })
  course: Course;

  @ManyToOne(() => Student, (student) => student.enrollments)
  @JoinColumn({ name: 'StudentID' })
  student: Student;

  @CreateDateColumn()
  CreatedAt: Date;

  @UpdateDateColumn({ type: 'timestamp', onUpdate: 'CURRENT_TIMESTAMP' })
  UpdatedAt: Date;
}
