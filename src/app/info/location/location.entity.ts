import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('locations')
export class Location {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column('varchar', { length: 255 })
  Area: string;

  @Column('varchar', { length: 255 })
  RoomNumber: string;

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
