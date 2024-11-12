import {Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {IsEmail, IsEnum} from "class-validator";
import {Exclude} from 'class-transformer';

export enum UserRole {
  ROLE_DEFAULT,
  ROLE_OPERATOR,
  ROLE_ADMIN
}

@Entity("user")
export class User {
  @PrimaryGeneratedColumn({unsigned: true})
  id: number;

  @Column({type: 'varchar'})
  @Index({unique: true})
  username: string;

  @Column({type: 'varchar', default: null, nullable: true})
  firstName;

  @Column({type: 'varchar', default: null, nullable: true})
  lastName: string;

  @Column({type: 'varchar'})
  @IsEmail()
  @Index({unique: true})
  email: string;

  @Column({type: 'varchar'})
  @Exclude()
  password: string;

  @IsEnum(UserRole)
  @Column({type: 'enum', enum: UserRole, default: UserRole.ROLE_DEFAULT})
  role: UserRole;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
