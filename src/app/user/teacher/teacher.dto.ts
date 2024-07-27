import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Min,
} from 'class-validator';

export class TeacherDto {
  @ApiProperty({ description: '姓名' })
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  Name: string;

  @ApiProperty({
    description: '用户密码',
    type: String,
  })
  @Length(8, 300)
  @IsNotEmpty()
  @IsString()
  Password: string;

  @ApiProperty({ description: '性别' })
  @IsString()
  @IsNotEmpty()
  @Length(1, 10)
  Gender: string;

  @ApiProperty({ description: '年龄' })
  @IsInt()
  @Min(0)
  Age: number;

  @ApiProperty({ description: '手机号' })
  @IsString()
  @IsNotEmpty()
  @Length(1, 20)
  PhoneNumber: string;

  @ApiProperty({ description: '职位' })
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  Position: string;

  @ApiProperty({ description: '工资' })
  @IsInt()
  @Min(0)
  Salary: number;

  @ApiProperty({ description: '学院ID' })
  @IsString()
  @IsNotEmpty()
  @Length(10, 10)
  CollegeID: string;

  @ApiProperty({ description: '学院名称' })
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  CollegeName: string;

  @ApiProperty({ description: '聘用时间' })
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  HiringDate: string;

  @ApiProperty({ description: '教师状态', default: '在职' })
  @IsString()
  @IsOptional()
  @Length(1, 255)
  Status?: string;
}
