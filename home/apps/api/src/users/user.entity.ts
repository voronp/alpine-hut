import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

import {Profile} from '../profiles/profile.entity'

export enum UserRole {
  ADMIN = "admin",
  REGULAR = "regular",
}

console.log(Profile)

@Entity('auth')
export class User {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column()
  Login: string;

  @Column()
  Password: string;

  @Column()
  Email: string;

  @Column()
  Salt: string;

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.REGULAR,
  })
  Role: UserRole;

  @Column({type: "tinyint"})
  Status: number;

  @Column()
  SessionID: string;

  @ManyToOne(() => Profile, profile => profile.Users, {
    eager: true
  })
  @JoinColumn({ name: "ProfileID" })
  Profile: Profile;

}
