import { Entity, Column, PrimaryColumn, BaseEntity, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('teachers')
export class Teacher extends BaseEntity {
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

  @Column({ type: 'varchar', length: 255, comment: '职位' })
  Position: string;

  @Column({ type: 'float', comment: '工资' })
  Salary: number;

  @Column({ type: 'char', length: 10, comment: '学院ID' })
  CollegeID: string;

  @Column({ type: 'varchar', length: 255, comment: '学院名称' })
  CollegeName: string;

  @Column({ type: 'varchar', length: 255, comment: '聘用时间' })
  HiringDate: string;

  @Column({ type: 'varchar', length: 255, default: '在职', comment: '教师状态' })
  Status: string;

  @CreateDateColumn({ type: 'timestamp', comment: '创建时间' })
  CreatedAt: Date;

  @UpdateDateColumn({ type: 'timestamp', comment: '更新时间' })
  UpdatedAt: Date;

  @Column({ type: 'boolean', default: false, comment: '是否删除' })
  IsDeleted: boolean;
}
