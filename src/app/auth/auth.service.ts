import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { UserDto, UserPayload } from '../user/user.dto';
import { UserService } from '../user/user.service';
import { SignInResultDto, UserSignInDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @Inject(Logger) private readonly logger: Logger,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  async validateUser(signInDto: UserSignInDto) {
    const user = await this.userService.userSignIn(signInDto);
    if (!user) {
      this.logger.error(
        `User ${signInDto.username}, The user name does not match the password or does not exist`,
      );
      throw new UnauthorizedException();
    }

    return user;
  }

  async signToken(user: UserDto) {
    const payload: Partial<UserPayload> = { username: user.Username, sub: user.ID };
    const token = this.jwtService.sign(payload);

    this.logger.debug(
      `User ${user.Username} sign in successfully, token: ${token}`,
    );

    await this.cacheManager.set(
      `Token_${user.UID?.toString()}`,
      token,
      this.config.get<number>('JWT_EXPIRES_IN'),
    );

    return token;
  }

  async signIn(user: UserDto) {
    const token = await this.signToken(user);

    return {
      token,
      type: 'Bearer',
      expires_in: this.config.get<number>('JWT_EXPIRES_IN'),
    } as SignInResultDto;
  }

  async signOut(user: UserPayload) {
    this.logger.debug(`User ${user.username} sign out successfully`);
    return await this.cacheManager.del(`Token_${user.sub.toString()}`);
  }
}
