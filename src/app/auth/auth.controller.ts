import { Controller, UseGuards } from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { SkipThrottle } from '@nestjs/throttler';

import { Public } from '../decorator/auth.decorator';
import { PostOk } from '../decorator/swagger.decorator';
import { UserInfo } from '../decorator/user.decorator';
import { LocalAuthGuard } from '../guard/auth/local.guard';
import { UserDto, UserPayload } from '../user/user.dto';
import { SignInResultDto, UserSignInDto } from './auth.dto';
import { AuthService } from './auth.service';

@ApiTags('鉴权')
@SkipThrottle()
@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: '用户登录' })
  @ApiBody({ type: UserSignInDto })
  @ApiUnauthorizedResponse({ description: '用户名或密码错误' })
  @UseGuards(LocalAuthGuard)
  @Public()
  @PostOk('/sign-in')
  signIn(@UserInfo() user: UserDto): Promise<SignInResultDto> {
    return this.authService.signIn(user);
  }

  @ApiOperation({ summary: '用户登出' })
  @PostOk('/sign-out')
  signOut(@UserInfo() user: UserPayload) {
    return this.authService.signOut(user);
  }
}
