import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Class } from './class.entity';
import { CreateClassDto, UpdateClassDto } from './class.dto';

@Injectable()
export class ClassService {
  constructor(
    @InjectRepository(Class)
    private readonly classRepository: Repository<Class>,
  ) {}

  async createClass(createClassDto: CreateClassDto): Promise<Class> {
    const classEntity = this.classRepository.create(createClassDto);
    return this.classRepository.save(classEntity);
  }

  async findAll(): Promise<Class[]> {
    return this.classRepository.find({ where: { IsDeleted: false } });
  }

  async findOne(id: string): Promise<Class> {
    const classEntity = await this.classRepository.findOne({
      where: { ID: id, IsDeleted: false },
    });
    if (!classEntity) {
      throw new NotFoundException('Class not found');
    }
    return classEntity;
  }

  async updateClass(
    id: string,
    updateClassDto: UpdateClassDto,
  ): Promise<Class> {
    await this.classRepository.update(id, updateClassDto);
    return this.findOne(id);
  }

  async removeClass(id: string): Promise<void> {
    await this.classRepository.update(id, { IsDeleted: true });
  }
}
