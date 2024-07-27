import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminDto } from './admin.dto';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Admin } from './admin.entity';

@ApiTags('管理员')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  @ApiOperation({ summary: '创建管理员' })
  @ApiResponse({ status: 201, description: '创建管理员', type: Admin })
  async create(@Body() adminDto: AdminDto): Promise<Admin> {
    return this.adminService.create(adminDto);
  }

  @Get()
  @ApiOperation({ summary: '获取所有管理员' })
  @ApiResponse({ status: 200, description: '获取所有管理员', type: [Admin] })
  async findAll(): Promise<Admin[]> {
    return this.adminService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: '获取管理员详情' })
  @ApiResponse({ status: 200, description: '获取管理员详情', type: Admin })
  async findOne(@Param('id') id: string): Promise<Admin> {
    return this.adminService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: '更新管理员' })
  @ApiResponse({ status: 200, description: '更新管理员', type: Admin })
  async update(
    @Param('id') id: string,
    @Body() adminDto: AdminDto,
  ): Promise<Admin> {
    return this.adminService.update(id, adminDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除管理员' })
  @ApiResponse({ status: 204, description: '删除管理员' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.adminService.remove(id);
  }
}
