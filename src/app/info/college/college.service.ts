import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { College } from './college.entity';
import { CreateCollegeDto, UpdateCollegeDto } from './college.dto';

@Injectable()
export class CollegeService {
  constructor(
    @InjectRepository(College)
    private readonly collegeRepository: Repository<College>,
  ) {}

  async createCollege(createCollegeDto: CreateCollegeDto): Promise<College> {
    const college = this.collegeRepository.create(createCollegeDto);
    return this.collegeRepository.save(college);
  }

  async findAll(): Promise<College[]> {
    return this.collegeRepository.find({ where: { IsDeleted: false } });
  }

  async findOne(id: string): Promise<College> {
    const college = await this.collegeRepository.findOne({
      where: { ID: id, IsDeleted: false },
    });
    if (!college) {
      throw new NotFoundException('College not found');
    }
    return college;
  }

  async updateCollege(
    id: string,
    updateCollegeDto: UpdateCollegeDto,
  ): Promise<College> {
    await this.collegeRepository.update(id, updateCollegeDto);
    return this.findOne(id);
  }

  async removeCollege(id: string): Promise<void> {
    await this.collegeRepository.update(id, { IsDeleted: true });
  }
}
