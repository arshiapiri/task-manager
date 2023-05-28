import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import {
    IsEmail,
    IsString,
  } from 'class-validator';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  @IsString()
  username: string;
  
  @Column({ unique: true, nullable: false })
  @IsEmail()
  email: string;

  @Column({ nullable: false })
  password: string;

}
