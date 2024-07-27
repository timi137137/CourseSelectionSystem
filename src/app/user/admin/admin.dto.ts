import { ApiProperty } from '@nestjs/swagger';
import {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  IsBoolean,
  IsDate,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Min,
} from 'class-validator';

export class AdminDto {
  @ApiProperty({
    description: 'id',
    type: String,
  })
  @Length(8, 300)
  @IsNotEmpty()
  @IsString()
  ID: string;

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

  @ApiProperty({ description: '权限', default: 1 })
  @IsInt()
  @Min(1)
  @IsOptional()
  Permission?: number;

  @ApiProperty({ description: '创建时间', default: 1 })
  @IsDate()
  @Min(1)
  @IsOptional()
  CreateAt?: Date;

  @ApiProperty({ description: '修改时间', default: 1 })
  @IsDate()
  @Min(1)
  @IsOptional()
  UpdateAt?: Date;

  @ApiProperty({ description: '是否删除', default: 1 })
  @IsBoolean()
  @Min(1)
  @IsOptional()
  IsDeleted?: boolean;
}
