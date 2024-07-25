import { Logger, Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { AuthModule } from './auth/auth.module';
import { RolesGuard } from './guard/role.guard';
import { RoleThrottlerGuard } from './guard/throttler.guard';
import { UserModule } from './user/user.module';

// 总模块 - 控制所有API
@Module({
  imports: [AuthModule, UserModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleThrottlerGuard,
    },
    Logger,
  ],
})
export class MasterModule {}
