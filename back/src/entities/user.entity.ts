import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsEmail, IsNotEmpty, Length, Matches } from 'class-validator';
import { Transform } from 'class-transformer';
import { strongPasswordRegExp } from '../constants/regex';

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

  @Column()
  @IsNotEmpty({ message: 'Can not be empty!' })
  name: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
