import { Buffer } from 'node:buffer';

import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  ForbiddenException,
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { Role, UserPayload } from '../user/user.dto';
import { UserRepository } from '../user/user.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @Inject(Logger) private readonly logger: Logger,
    private readonly userRepository: UserRepository,
    private readonly config: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: Buffer.from(
        config.get<string>('JWT_PUBLIC_KEY')!,
        'utf8',
      ).toString(),
      ignoreExpiration: false,
      passReqToCallback: true,
    });
  }

  async validate(request: Request, payload: UserPayload) {
    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(request);
    const user = await this.userRepository.SearchUser({ ID: payload?.sub });
    const cache = await this.cacheManager.get(`Token_${payload?.sub}`);

    if (user?.Role === Role.Disabled) {
      this.logger.error(`Token not found in cache for user ${payload?.sub}`);
      throw new ForbiddenException();
    }
    if (!cache) {
      this.logger.error(`Token not found in cache for user ${payload?.sub}`);
      throw new UnauthorizedException();
    }
    if (token !== cache) {
      this.logger.error(`Token not match in cache for user ${payload?.sub}`);
      throw new UnauthorizedException();
    }

    await this.cacheManager.set(
      `Token_${payload?.sub}`,
      token,
      this.config.get<number>('JWT_EXPIRES_IN'),
    );
    return payload;
  }
}
