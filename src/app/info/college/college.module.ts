import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollegeService } from './college.service';
import { CollegeController } from './college.controller';
import { College } from './college.entity';

@Module({
  imports: [TypeOrmModule.forFeature([College])],
  providers: [CollegeService],
  controllers: [CollegeController],
})
export class CollegeModule {}
