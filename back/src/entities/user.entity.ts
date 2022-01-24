import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { IsDate, IsEmail, IsNotEmpty, Length, Matches } from 'class-validator';
import { Transform } from 'class-transformer';
import { strongPasswordRegExp } from '../constants/regex';
import { Post } from './post.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty({ message: 'Can not be empty!' })
  @IsEmail({}, { message: 'Invalid email input!' })
  @Transform(({ value }) => value.toLowerCase())
  email: string;

  @Column()
  @IsNotEmpty({ message: 'Can not be empty!' })
  @Length(8, 50, { message: 'Must be greater than 8 chars and less 50' })
  @Matches(strongPasswordRegExp, {
    message: 'Password must contain digits, lowercase and uppercase',
  })
  password: string;

  @OneToMany(() => Post, (post) => post.author)
  @JoinColumn({ name: 'posts', referencedColumnName: 'id' })
  posts: Post[];

  @Column()
  @IsNotEmpty({ message: 'Can not be empty!' })
  name: string;

  @Column()
  avatar: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  @IsDate()
  createdAt: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  @IsDate()
  updatedAt: Date;
}
