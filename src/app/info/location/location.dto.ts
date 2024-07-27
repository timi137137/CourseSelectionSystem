import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateLocationDto {
  @ApiProperty({ description: '区域' })
  @IsNotEmpty()
  @IsString()
  Area: string;

  @ApiProperty({ description: '房间号' })
  @IsNotEmpty()
  @IsString()
  RoomNumber: string;
}

export class UpdateLocationDto {
  @ApiProperty({ description: '区域' })
  @IsOptional()
  @IsString()
  Area?: string;

  @ApiProperty({ description: '房间号' })
  @IsOptional()
  @IsString()
  RoomNumber?: string;
}
