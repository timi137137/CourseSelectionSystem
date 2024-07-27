import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateClassDto {
  @ApiProperty({ description: '班级名称' })
  @IsNotEmpty()
  @IsString()
  ClassName: string;

  @ApiProperty({ description: '所属学院ID' })
  @IsNotEmpty()
  @IsUUID()
  CollegeID: string;
}

export class UpdateClassDto {
  @ApiProperty({ description: '班级名称' })
  @IsOptional()
  @IsString()
  ClassName?: string;

  @ApiProperty({ description: '所属学院ID' })
  @IsOptional()
  @IsUUID()
  CollegeID?: string;
}
