import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';

import { UserSignInDto } from '../auth/auth.dto';
import { Role, UserCreateDto } from './user.dto';
import { User } from './user.entity';
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

  async createUser(userInfo: UserCreateDto) {
    this.logger.debug(`User want to create: ${userInfo.Username}`);

    const user = new User();
    user.Username = userInfo.Username;
    user.Password = userInfo.Password;
    user.Role = userInfo.Role;
    user.Expiration_Date = userInfo.Expiration_Date;

    if (await this.userRepository.CreateUser(user)) {
      return await this.userRepository.SearchUser({
        Username: userInfo.Username,
      });
    } else {
      this.logger.error(`User create failed: ${userInfo.Username}`);
      throw new InternalServerErrorException('User create failed');
    }
  }

  async blockUser(userID: string) {
    this.logger.debug(`User want to block: ${userID}`);

    const user = await this.userRepository.SearchUser({ UID: userID });
    if (!user) throw new NotFoundException('User not found');

    user.Role = Role.Disabled;

    if (await this.userRepository.UpdateUser(user)) {
      return;
    } else {
      this.logger.error(`User block failed: ${userID}`);
      throw new InternalServerErrorException('User block failed');
    }
  }

  async getUserInfo(username: string) {
    const user = await this.userRepository.SearchUser({ Username: username });
    if (!user) throw new NotFoundException('User not found');

    return user;
  }
}
