import { Inject, Injectable, Logger } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { transaction } from '../../utils/tools';
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

  async CreateUser(userInfo: User) {
    return await transaction(
      this.dataSource,
      this.logger,
      async (queryRunner) => {
        await queryRunner.manager.save(userInfo);
      },
    );
  }

  async UpdateUser(userInfo: User) {
    return await transaction(
      this.dataSource,
      this.logger,
      async (queryRunner) => {
        let user: User | null;
        user = await queryRunner.manager.findOne(User, {
          where: { ...userInfo },
        });
        user = userInfo;
        await queryRunner.manager.save(user);
      },
    );
  }

  SearchUser(userInfo: UserDto) {
    return this.findOne({ where: { ...userInfo }, cache: true });
  }

  async CheckUserSecret(Username: string, Password: string) {
    return await this.createQueryBuilder('User')
      .select('User.Username')
      .addSelect('User.Password')
      .addSelect('User.ID')
      .where({ Username, Password })
      .getOne();
  }

  async DeleteUser(userInfo: UserDto) {
    return await transaction(
      this.dataSource,
      this.logger,
      async (queryRunner) => {
        const user = await queryRunner.manager.findOne(User, {
          where: { ...userInfo },
        });
        await queryRunner.manager.softRemove(user);
      },
    );
  }
}
