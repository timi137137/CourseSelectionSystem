import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCollegeDto {
  @ApiProperty({ description: '学院ID' })
  @IsNotEmpty()
  @IsString()
  ID: string;

  @ApiProperty({ description: '学院名称' })
  @IsNotEmpty()
  @IsString()
  CollegeName: string;
}

export class UpdateCollegeDto {
  @ApiProperty({ description: '学院ID' })
  @IsOptional()
  @IsString()
  ID?: string;

  @ApiProperty({ description: '学院名称' })
  @IsOptional()
  @IsString()
  CollegeName?: string;
}
