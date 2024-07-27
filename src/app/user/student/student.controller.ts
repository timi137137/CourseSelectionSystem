import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentDto } from './student.dto';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Student } from './student.entity';

@ApiTags('学生')
@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  @ApiOperation({ summary: '创建学生' })
  @ApiResponse({ status: 201, description: '创建学生', type: Student })
  async create(@Body() studentDto: StudentDto): Promise<Student> {
    return this.studentService.create(studentDto);
  }

  @Get()
  @ApiOperation({ summary: '获取所有学生' })
  @ApiResponse({ status: 200, description: '获取所有学生', type: [Student] })
  async findAll(): Promise<Student[]> {
    return this.studentService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: '获取学生详情' })
  @ApiResponse({ status: 200, description: '获取学生详情', type: Student })
  async findOne(@Param('id') id: string): Promise<Student> {
    return this.studentService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: '更新学生' })
  @ApiResponse({ status: 200, description: '更新学生', type: Student })
  async update(@Param('id') id: string, @Body() studentDto: StudentDto): Promise<Student> {
    return this.studentService.update(id, studentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除学生' })
  @ApiResponse({ status: 204, description: '删除学生' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.studentService.remove(id);
  }
}
