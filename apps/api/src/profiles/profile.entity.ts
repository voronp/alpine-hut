import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import {User} from '../users/user.entity'
import {ProfileAuthorization} from "../profile-authorizations/profile-authorization.entity";
import {TypeormLoader} from "type-graphql-dataloader";

@Entity('profiles')
export class Profile {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column()
  Name: string;

  @Column()
  Description: string;

  @Column()
  IsAdmin: boolean

  @OneToMany(() => User, user => user.Profile)
  @TypeormLoader()
  Users: User[];

  @OneToMany('ProfileAuthorization', 'Profile')
  @TypeormLoader()
  Authorizations: ProfileAuthorization[];
}
