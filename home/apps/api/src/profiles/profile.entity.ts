import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import {User} from '../users/user.entity'

@Entity('profiles')
export class Profile {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column()
  Name: string;

  @Column()
  Description: string;

  @OneToMany(() => User, user => user.Profile)
  Users: User[];

}
