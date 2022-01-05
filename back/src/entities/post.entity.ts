import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { MinLength, MaxLength, IsDate, IsNotEmpty } from 'class-validator';
import { User } from './user.entity';
import { UserID } from '../types/user.types';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty({ message: 'Can not be empty!' })
  @MinLength(3, {
    message: 'Title is too short',
  })
  @MaxLength(50, {
    message: 'Title is too long',
  })
  title: string;

  @Column()
  @IsNotEmpty({ message: 'Can not be empty!' })
  @MaxLength(500, {
    message: 'content is too long',
  })
  content: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  @IsDate()
  createdAt: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  @IsDate()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: 'userID', referencedColumnName: 'id' })
  author: UserID;
}
