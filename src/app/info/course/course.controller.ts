import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CourseService } from './course.service';
import { CourseDto } from './course.dto';
import { Course } from './course.entity';

@ApiTags('课程')
@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @ApiOperation({ summary: '创建课程' })
  @Post()
  async create(@Body() courseDto: CourseDto): Promise<Course> {
    return this.courseService.create(courseDto);
  }

  @ApiOperation({ summary: '获取所有课程' })
  @Get()
  async findAll(): Promise<Course[]> {
    return this.courseService.findAll();
  }

  @ApiOperation({ summary: '获取单个课程' })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Course> {
    return this.courseService.findOne(id);
  }

  @ApiOperation({ summary: '更新课程' })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDto: CourseDto,
  ): Promise<Course> {
    return this.courseService.update(id, updateDto);
  }

  @ApiOperation({ summary: '删除课程' })
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.courseService.remove(id);
  }
}
