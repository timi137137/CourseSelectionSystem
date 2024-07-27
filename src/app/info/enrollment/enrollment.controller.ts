import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { EnrollmentService } from './enrollment.service';
import { CreateEnrollmentDto, UpdateEnrollmentDto } from './enrollment.dto';

@ApiTags('选课')
@Controller('enrollments')
export class EnrollmentController {
  constructor(private readonly enrollmentService: EnrollmentService) {}

  @ApiOperation({ summary: '创建选课' })
  @Post()
  async create(@Body() createEnrollmentDto: CreateEnrollmentDto) {
    return this.enrollmentService.createEnrollment(createEnrollmentDto);
  }

  @ApiOperation({ summary: '获取所有选课' })
  @Get()
  async findAll() {
    return this.enrollmentService.findAll();
  }

  @ApiOperation({ summary: '获取特定课程和学生的选课' })
  @Get(':courseID/:studentID')
  async findOne(
    @Param('courseID') courseID: string,
    @Param('studentID') studentID: string,
  ) {
    return this.enrollmentService.findOne(courseID, studentID);
  }

  @ApiOperation({ summary: '更新选课信息' })
  @Put(':courseID/:studentID')
  async update(
    @Param('courseID') courseID: string,
    @Param('studentID') studentID: string,
    @Body() updateEnrollmentDto: UpdateEnrollmentDto,
  ) {
    return this.enrollmentService.updateEnrollment(
      courseID,
      studentID,
      updateEnrollmentDto,
    );
  }

  @ApiOperation({ summary: '删除选课' })
  @Delete(':courseID/:studentID')
  async remove(
    @Param('courseID') courseID: string,
    @Param('studentID') studentID: string,
  ) {
    return this.enrollmentService.removeEnrollment(courseID, studentID);
  }
}
