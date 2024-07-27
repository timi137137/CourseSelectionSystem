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
import { LocationService } from './location.service';
import { CreateLocationDto, UpdateLocationDto } from './location.dto';

@ApiTags('地点')
@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @ApiOperation({ summary: '创建地点' })
  @Post()
  async create(@Body() createLocationDto: CreateLocationDto) {
    return this.locationService.createLocation(createLocationDto);
  }

  @ApiOperation({ summary: '获取所有地点' })
  @Get()
  async findAll() {
    return this.locationService.findAll();
  }

  @ApiOperation({ summary: '获取单个地点' })
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.locationService.findOne(id);
  }

  @ApiOperation({ summary: '更新地点' })
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateLocationDto: UpdateLocationDto,
  ) {
    return this.locationService.updateLocation(id, updateLocationDto);
  }

  @ApiOperation({ summary: '删除地点' })
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.locationService.removeLocation(id);
  }
}
