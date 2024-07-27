import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
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
