import { CacheInterceptor } from '@nestjs/cache-manager';
import {
  Body,
  Controller,
  Get,
  Inject,
  Logger,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { RoleAuth } from '../decorator/swagger.decorator';
import { UserInfo } from '../decorator/user.decorator';
import { Role, UserCreateDto, UserPayload } from './user.dto';
import { UserService } from './user.service';

@ApiTags('用户')
@UseInterceptors(CacheInterceptor)
@Controller('/user')
export class UserController {
  constructor(
    @Inject(Logger) private readonly logger: Logger,
    private readonly userService: UserService,
  ) {}

  @ApiOperation({ summary: '创建用户' })
  @RoleAuth(Role.Admin, false)
  @Post('/')
  async createUser(@Body() userInfo: UserCreateDto) {
    return await this.userService.createUser(userInfo);
  }

  @ApiOperation({ summary: '禁用用户' })
  @ApiParam({ name: 'id', description: '用户唯一识别码', type: String })
  @RoleAuth(Role.Admin)
  @Patch('/:id')
  async blockUser(@Query('id') userID: string) {
    return await this.userService.blockUser(userID);
  }

  @ApiOperation({ summary: '获取用户信息' })
  @ApiUnauthorizedResponse({ description: '用户未登录' })
  @Get('/')
  async getUserInfo(@UserInfo() user: UserPayload) {
    return await this.userService.getUserInfo(user.username);
  }
}
