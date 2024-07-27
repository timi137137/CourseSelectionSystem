import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './student.entity';
import { StudentDto } from './student.dto';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  async create(studentDto: StudentDto): Promise<Student> {
    const student = this.studentRepository.create(studentDto);
    return await this.studentRepository.save(student);
  }

  async findAll(): Promise<Student[]> {
    return await this.studentRepository.find({ where: { IsDeleted: false } });
  }

  async findOne(id: string): Promise<Student> {
    const student = await this.studentRepository.findOne({ where: { ID: id, IsDeleted: false } });
    if (!student) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }
    return student;
  }

  async update(id: string, studentDto: StudentDto): Promise<Student> {
    await this.findOne(id); // Ensure the entity exists
    await this.studentRepository.update(id, studentDto);
    return this.findOne(id); // Return the updated entity
  }

  async remove(id: string): Promise<void> {
    const student = await this.findOne(id); // Ensure the entity exists
    student.IsDeleted = true;
    await this.studentRepository.save(student);
  }
}
