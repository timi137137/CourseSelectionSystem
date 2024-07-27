import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { Role } from './user.dto';

@Entity()
export class User {
  // 用户唯一ID
  @PrimaryGeneratedColumn('uuid')
  UID: string;

  // 用户名
  @Column('varchar', { length: 80 })
  Username: string;

  // 密码 - 不可查询
  @Column('varchar', { length: 300, select: false })
  Password: string;

  // 权限组
  @Column('enum', { enum: Role, default: Role.User })
  Role: Role;
}
