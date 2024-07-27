import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Enrollment } from './enrollment.entity';
import { CreateEnrollmentDto, UpdateEnrollmentDto } from './enrollment.dto';

@Injectable()
export class EnrollmentService {
  constructor(
    @InjectRepository(Enrollment)
    private readonly enrollmentRepository: Repository<Enrollment>,
  ) {}

  async createEnrollment(
    createEnrollmentDto: CreateEnrollmentDto,
  ): Promise<Enrollment> {
    const enrollment = this.enrollmentRepository.create(createEnrollmentDto);
    return this.enrollmentRepository.save(enrollment);
  }

  async findAll(): Promise<Enrollment[]> {
    return this.enrollmentRepository.find({ where: { IsDeleted: false } });
  }

  async findOne(courseID: string, studentID: string): Promise<Enrollment> {
    const enrollment = await this.enrollmentRepository.findOne({
      where: { CourseID: courseID, StudentID: studentID, IsDeleted: false },
    });
    if (!enrollment) {
      throw new NotFoundException('Enrollment not found');
    }
    return enrollment;
  }

  async updateEnrollment(
    courseID: string,
    studentID: string,
    updateEnrollmentDto: UpdateEnrollmentDto,
  ): Promise<Enrollment> {
    const enrollment = await this.findOne(courseID, studentID);
    Object.assign(enrollment, updateEnrollmentDto);
    return this.enrollmentRepository.save(enrollment);
  }

  async removeEnrollment(courseID: string, studentID: string): Promise<void> {
    const enrollment = await this.findOne(courseID, studentID);
    enrollment.IsDeleted = true;
    await this.enrollmentRepository.save(enrollment);
  }
}
