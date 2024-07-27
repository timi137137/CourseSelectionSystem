import { CacheInterceptor } from '@nestjs/cache-manager';
import { Controller, Inject, Logger, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UserService } from './user.service';

@ApiTags('用户')
@UseInterceptors(CacheInterceptor)
@Controller('/user')
export class UserController {
  constructor(
    @Inject(Logger) private readonly logger: Logger,
    private readonly userService: UserService,
  ) {}
}
