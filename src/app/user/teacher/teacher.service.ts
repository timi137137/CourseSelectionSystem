import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Teacher } from './teacher.entity';
import { TeacherDto } from './teacher.dto';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
  ) {}

  async create(teacherDto: TeacherDto): Promise<Teacher> {
    const teacher = this.teacherRepository.create(teacherDto);
    return await this.teacherRepository.save(teacher);
  }

  async findAll(): Promise<Teacher[]> {
    return await this.teacherRepository.find({ where: { IsDeleted: false } });
  }

  async findOne(id: string): Promise<Teacher> {
    const teacher = await this.teacherRepository.findOne({ where: { ID: id, IsDeleted: false } });
    if (!teacher) {
      throw new NotFoundException(`Teacher with ID ${id} not found`);
    }
    return teacher;
  }

  async update(id: string, teacherDto: TeacherDto): Promise<Teacher> {
    await this.findOne(id); // Ensure the entity exists
    await this.teacherRepository.update(id, teacherDto);
    return this.findOne(id); // Return the updated entity
  }

  async remove(id: string): Promise<void> {
    const teacher = await this.findOne(id); // Ensure the entity exists
    teacher.IsDeleted = true;
    await this.teacherRepository.save(teacher);
  }
}
