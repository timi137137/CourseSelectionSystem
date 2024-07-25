import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Role } from './user.dto';

@Entity()
export class User {
  // 自增ID - 仅用于索引
  @PrimaryGeneratedColumn()
  ID: number;

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

  // 用户IP
  @Column('varchar', { length: 15, nullable: true })
  IP?: string;

  // 机器码
  @Column('varchar', { nullable: true })
  Machine_Code?: string;

  // 过期日期
  @Column('datetime', { nullable: true })
  Expiration_Date?: Date;

  // 最后登录日期
  @Column('datetime', { nullable: true })
  Last_Login_Date?: Date;

  // 创建日期
  @CreateDateColumn()
  Created_Date: Date;

  // 删除日期
  @DeleteDateColumn()
  Deleted_Date?: Date;
}
