import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './admin.entity';
import { AdminDto } from './admin.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
  ) {}

  async create(adminDto: AdminDto): Promise<Admin> {
    const admin = this.adminRepository.create(adminDto);
    return await this.adminRepository.save(admin);
  }

  async findAll(): Promise<Admin[]> {
    return await this.adminRepository.find({ where: { IsDeleted: false } });
  }

  async findOne(id: string): Promise<Admin> {
    const admin = await this.adminRepository.findOne({ where: { ID: id, IsDeleted: false } });
    if (!admin) {
      throw new NotFoundException(`Admin with ID ${id} not found`);
    }
    return admin;
  }

  async update(id: string, adminDto: AdminDto): Promise<Admin> {
    await this.findOne(id); // Ensure the entity exists
    await this.adminRepository.update(id, adminDto);
    return this.findOne(id); // Return the updated entity
  }

  async remove(id: string): Promise<void> {
    const admin = await this.findOne(id); // Ensure the entity exists
    admin.IsDeleted = true;
    await this.adminRepository.save(admin);
  }
}
