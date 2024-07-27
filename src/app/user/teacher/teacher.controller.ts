import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { TeacherDto } from './teacher.dto';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Teacher } from './teacher.entity';

@ApiTags('教师')
@Controller('teacher')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Post()
  @ApiOperation({ summary: '创建教师' })
  @ApiResponse({ status: 201, description: '创建教师', type: Teacher })
  async create(@Body() teacherDto: TeacherDto): Promise<Teacher> {
    return this.teacherService.create(teacherDto);
  }

  @Get()
  @ApiOperation({ summary: '获取所有教师' })
  @ApiResponse({ status: 200, description: '获取所有教师', type: [Teacher] })
  async findAll(): Promise<Teacher[]> {
    return this.teacherService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: '获取教师详情' })
  @ApiResponse({ status: 200, description: '获取教师详情', type: Teacher })
  async findOne(@Param('id') id: string): Promise<Teacher> {
    return this.teacherService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: '更新教师' })
  @ApiResponse({ status: 200, description: '更新教师', type: Teacher })
  async update(@Param('id') id: string, @Body() teacherDto: TeacherDto): Promise<Teacher> {
    return this.teacherService.update(id, teacherDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除教师' })
  @ApiResponse({ status: 204, description: '删除教师' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.teacherService.remove(id);
  }
}
