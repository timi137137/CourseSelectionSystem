import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UserSignInDto {
  @ApiProperty({
    description: '用户名',
    type: String,
  })
  @IsNotEmpty()
  username: string;
  @ApiProperty({
    description: '密码',
    type: String,
  })
  @IsNotEmpty()
  password: string;
}

export class SignInResultDto {
  @ApiProperty({
    description: 'JWT Token',
    type: String,
  })
  @IsNotEmpty()
  token: string;
  @ApiProperty({
    description: '令牌类型',
    default: 'Bearer',
    type: String,
  })
  @IsNotEmpty()
  type: string;
  @ApiProperty({
    description: '过期时间，单位毫秒',
    type: Number,
  })
  @IsNotEmpty()
  expires_in: number;
}
