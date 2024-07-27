import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';

import { UserSignInDto } from '../auth/auth.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @Inject(Logger) private readonly logger: Logger,
    private readonly userRepository: UserRepository,
  ) {}

  async userSignIn(userInfo: UserSignInDto) {
    this.logger.debug(`User want to sign in: ${userInfo.username}`);

    return await this.userRepository.CheckUserSecret(
      userInfo.username,
      userInfo.password,
    );
  }

  async getUserInfo(username: string) {
    const user = await this.userRepository.SearchUser({ Username: username });
    if (!user) throw new NotFoundException('User not found');

    return user;
  }
}
