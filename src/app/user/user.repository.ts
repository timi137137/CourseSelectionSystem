import { Inject, Injectable, Logger } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { UserDto } from './user.dto';
import { User } from './user.entity';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(
    @Inject(Logger) private readonly logger: Logger,
    private dataSource: DataSource,
  ) {
    super(User, dataSource.createEntityManager());
  }

  SearchUser(userInfo: UserDto) {
    return this.findOne({ where: { ...userInfo }, cache: true });
  }

  async CheckUserSecret(Username: string, Password: string) {
    return await this.createQueryBuilder('User')
      .select('User.Username')
      .addSelect('User.Password')
      .addSelect('User.UID')
      .where({ Username, Password })
      .getOne();
  }
}
