import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  MinDate,
} from 'class-validator';

export enum Role {
  Admin = 50000, // 管理员
  RedTeam = 600, // 红队
  User = 60, // 普通用户
  Disabled = 0, // 禁用
}

export class UserDto {
  @ApiProperty({
    description: '用户内部ID - 通常不应该暴露给用户',
    type: Number,
  })
  @IsOptional()
  ID?: number;

  @ApiProperty({
    description: '用户唯一识别码',
    type: String,
  })
  @IsOptional()
  UID?: string;

  @ApiProperty({
    description: '用户名',
    type: String,
  })
  @IsOptional()
  Username?: string;

  @ApiProperty({
    description: '权限组',
    enum: Role,
  })
  @IsOptional()
  Role?: Role;

  @ApiProperty({
    description: 'IP地址',
    type: String,
  })
  @IsOptional()
  IP?: string;

  @ApiProperty({
    description: '机器码',
    type: String,
  })
  @IsOptional()
  Machine_Code?: string;

  @ApiProperty({
    description: '过期时间',
    type: Date,
  })
  @IsOptional()
  Expiration_Date?: Date;

  @ApiProperty({
    description: '最后上线日期',
    type: Date,
  })
  @IsOptional()
  Last_Login_Date?: Date;

  @ApiProperty({
    description: '账户创建时间',
    type: Date,
  })
  @IsOptional()
  Created_Date?: Date;

  @ApiProperty({
    description: '被删除时间',
    type: Date,
  })
  @IsOptional()
  Deleted_Date?: Date;
}

export class UserCreateDto {
  @ApiProperty({
    description: '用户名',
    type: String,
  })
  @Length(5, 80)
  @IsNotEmpty()
  @IsString()
  Username: string;

  @ApiProperty({
    description: '用户密码',
    type: String,
  })
  @Length(8, 300)
  @IsNotEmpty()
  @IsString()
  Password: string;

  @ApiProperty({
    description: '权限组',
    enum: Role,
  })
  @IsNotEmpty()
  @IsEnum(Role)
  Role: Role;

  @ApiProperty({
    description: '过期时间',
    type: Date,
  })
  @IsNotEmpty()
  @IsDate()
  @MinDate(new Date())
  @Type(() => Date)
  Expiration_Date: Date;
}

export class UserPayload {
  @ApiProperty({
    description: '用户ID',
    type: Number,
  })
  sub: number;
  @ApiProperty({
    description: '用户名',
    type: String,
  })
  username: string;
}
