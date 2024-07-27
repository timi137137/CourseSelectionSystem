import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('colleges')
export class College {
  @PrimaryGeneratedColumn('uuid')
  ID: string;

  @Column('varchar', { length: 255 })
  CollegeName: string;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  CreatedAt: Date;

  @Column('timestamp', {
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  UpdatedAt: Date;

  @Column({ type: 'boolean', default: false })
  IsDeleted: boolean;
}
