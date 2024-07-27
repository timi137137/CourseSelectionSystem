import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
  IsInt,
  IsPositive,
  IsDate,
  IsBoolean,
} from 'class-validator';

export class CourseDto {
  @ApiProperty({ description: '课程ID', type: String })
  @IsOptional()
  @IsString()
  ID?: string;

  @ApiProperty({ description: '课程名称', type: String })
  @IsNotEmpty()
  @IsString()
  CourseName: string;

  @ApiProperty({ description: '课程描述', type: String })
  @IsNotEmpty()
  @IsString()
  Description: string;

  @ApiProperty({ description: '课程学分', type: Number })
  @IsNotEmpty()
  @IsNumber()
  Credits: number;

  @ApiProperty({ description: '学院ID', type: String })
  @IsNotEmpty()
  @IsString()
  CollegeID: string;

  @ApiProperty({ description: '学院名称', type: String })
  @IsNotEmpty()
  @IsString()
  CollegeName: string;

  @ApiProperty({ description: '教师ID', type: String })
  @IsNotEmpty()
  @IsString()
  TeacherID: string;

  @ApiProperty({ description: '教师名称', type: String })
  @IsNotEmpty()
  @IsString()
  TeacherName: string;

  @ApiProperty({ description: '已选人数', type: Number })
  @IsNotEmpty()
  @IsNumber()
  Enrolled: number;

  @ApiProperty({ description: '课程容量', type: Number })
  @IsNotEmpty()
  @IsNumber()
  Capacity: number;

  @ApiProperty({ description: '上课时段', type: String, nullable: true })
  @IsOptional()
  @IsString()
  Schedule?: string;

  @ApiProperty({ description: '上课地点ID', type: Number, nullable: true })
  @IsOptional()
  @IsInt()
  @IsPositive()
  LocationID?: number;

  @ApiProperty({ description: '上课地点', type: String, nullable: true })
  @IsOptional()
  @IsString()
  Location?: string;

  @ApiProperty({ description: '创建时间', type: Date })
  @IsOptional()
  @IsDate()
  CreatedAt?: Date;

  @ApiProperty({ description: '更新时间', type: Date })
  @IsOptional()
  @IsDate()
  UpdatedAt?: Date;

  @ApiProperty({ description: '是否删除', type: Boolean })
  @IsOptional()
  @IsBoolean()
  IsDeleted?: boolean;
}
