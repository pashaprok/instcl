import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column({ type: 'datetime' })
  createdAt: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}