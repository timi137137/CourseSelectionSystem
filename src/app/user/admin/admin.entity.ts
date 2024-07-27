import { Entity, Column, PrimaryColumn, BaseEntity, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity('admins')
export class Admin extends BaseEntity {
  @PrimaryColumn({ type: 'char', length: 10, comment: 'ID' })
  ID: string;

  @Column({ type: 'varchar', length: 255, comment: '姓名' })
  Name: string;

  @Column({ type: 'varchar', length: 255, comment: '密码' })
  Password: string;

  @Column({ type: 'varchar', length: 10, comment: '性别' })
  Gender: string;

  @Column({ type: 'int', comment: '年龄' })
  Age: number;

  @Column({ type: 'varchar', length: 20, comment: '手机号' })
  PhoneNumber: string;

  @Column({ type: 'int', default: 1, comment: '权限' })
  Permission: number;

  @CreateDateColumn({ type: 'timestamp', comment: '创建时间' })
  CreatedAt: Date;

  @UpdateDateColumn({ type: 'timestamp', comment: '更新时间' })
  UpdatedAt: Date;

  @Column({ type: 'boolean', default: false, comment: '是否删除' })
  IsDeleted: boolean;
}
