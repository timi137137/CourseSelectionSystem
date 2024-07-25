import {
  ExecutionContext,
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import {
  seconds,
  ThrottlerException,
  ThrottlerGuard,
  ThrottlerOptions,
  ThrottlerStorage,
} from '@nestjs/throttler';
import { ExtractJwt } from 'passport-jwt';

import { UserService } from '../user/user.service';

@Injectable()
export class RoleThrottlerGuard extends ThrottlerGuard {
  constructor(
    options: Array<ThrottlerOptions>,
    storageService: ThrottlerStorage,
    @Inject(Logger) private readonly logger: Logger,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {
    super(options, storageService, new Reflector());
  }

  async handleRequest(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token: string | null = ExtractJwt.fromAuthHeaderAsBearerToken()(request);
    if (token === null) {
      this.logger.error('Token not found', 'RoleThrottlerGuard');
      throw new UnauthorizedException();
    }
    const payload = this.jwtService.decode(token);
    if (payload === null) {
      this.logger.error('Token invalid', 'RoleThrottlerGuard');
      throw new UnauthorizedException();
    }

    const user = await this.userService.getUserInfo(payload.username);
    const key = this.generateKey(context, 'Throttler', user.UID);
    const { totalHits } = await this.storageService.increment(key, seconds(60));

    if (totalHits >= user.Role) {
      throw new ThrottlerException();
    }

    return true;
  }
}
