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
import { CollegeService } from './college.service';
import { CreateCollegeDto, UpdateCollegeDto } from './college.dto';

@ApiTags('学院')
@Controller('college')
export class CollegeController {
  constructor(private readonly collegeService: CollegeService) {}

  @ApiOperation({ summary: '创建学院' })
  @Post()
  async create(@Body() createCollegeDto: CreateCollegeDto) {
    return this.collegeService.createCollege(createCollegeDto);
  }

  @ApiOperation({ summary: '获取所有学院' })
  @Get()
  async findAll() {
    return this.collegeService.findAll();
  }

  @ApiOperation({ summary: '获取单个学院' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.collegeService.findOne(id);
  }

  @ApiOperation({ summary: '更新学院' })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCollegeDto: UpdateCollegeDto,
  ) {
    return this.collegeService.updateCollege(id, updateCollegeDto);
  }

  @ApiOperation({ summary: '删除学院' })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.collegeService.removeCollege(id);
  }
}
