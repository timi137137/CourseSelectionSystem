import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ClassService } from './class.service';
import { CreateClassDto, UpdateClassDto } from './class.dto';

@ApiTags('班级')
@Controller('class')
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @ApiOperation({ summary: '创建班级' })
  @Post()
  async create(@Body() createClassDto: CreateClassDto) {
    return this.classService.createClass(createClassDto);
  }

  @ApiOperation({ summary: '获取所有班级' })
  @Get()
  async findAll() {
    return this.classService.findAll();
  }

  @ApiOperation({ summary: '获取单个班级' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.classService.findOne(id);
  }

  @ApiOperation({ summary: '更新班级' })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateClassDto: UpdateClassDto,
  ) {
    return this.classService.updateClass(id, updateClassDto);
  }

  @ApiOperation({ summary: '删除班级' })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.classService.removeClass(id);
  }
}
