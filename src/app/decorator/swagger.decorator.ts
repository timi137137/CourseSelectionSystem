import { applyDecorators, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { Role } from '../user/user.dto';
import { Roles } from './roles.decorator';

export const PostOk = (path: string) => {
  return applyDecorators(HttpCode(HttpStatus.OK), Post(path));
};

export const RoleAuth = (role: Role, checkFound: boolean = true) => {
  const decorators: PropertyDecorator[] = [
    ApiUnauthorizedResponse({ description: '用户未登录' }),
    ApiForbiddenResponse({ description: '用户权限不足' }),
    Roles(role),
  ];

  if (checkFound) {
    decorators.push(ApiNotFoundResponse({ description: '用户不存在' }));
  }

  return applyDecorators(...decorators);
};
